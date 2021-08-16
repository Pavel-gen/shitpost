const { Exe, Plan, Train } = require("../models/models");

class ExeController {
  async add(req, res) {
    const { content, exe_name } = req.body;
    if (!exe_name) {
      return res.json("недостаточно информации");
    }

    const plan_id = req.params.id;
    const exe = await Exe.create({
      content,
      exe_name,
      planId: plan_id,
    });
    return res.json({ exe });
  }
  async getAllP(req, res) {
    const id = req.params.id;
    const plan = await Plan.findOne({ where: { id: id } });

    if (req.user.id !== plan.userId) {
      return res.json({ message: "ошибка доступа" });
    }

    const exes = await Exe.findAll({ where: { planId: id } });
    return res.json(exes);
  }
  async getAllT(req, res) {
    const id = req.params.id;
    const train = await Train.findOne({ where: { id: id } });
    if (!train) {
      return res.json({ message: "train was not found" });
    }
    const planId = train.planId;

    const exes = await Exe.findAll({ where: { planId: planId } });
    return res.json(exes);
  }

  async update(req, res) {
    const id = req.params.id;
    const updated = await Exe.update(req.body, { where: { id: id } });
    if (!updated) {
      return res.json({ message: "exe not found" });
    }

    return res.json(updated);
  }
  async delete(req, res) {
    const id = req.params.id;
    const deleted = await Exe.destroy({ where: { id: id } });
    if (!deleted) {
      return res.json({ message: "exe not found" });
    }
    return res.json({ message: "exe was deleted" });
  }
}

module.exports = new ExeController();
