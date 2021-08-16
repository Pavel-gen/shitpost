const { Plan } = require("../models/models");

class PlanController {
  async create(req, res) {
    const { plan_name } = req.body;
    const id = req.user.id;
    if (!plan_name) {
      throw new Error("не указано имя плана");
    }
    const plan = await Plan.create({
      plan_name,
      userId: id,
    });
    return res.json(plan);
  }
  async getAll(req, res) {
    const id = req.user.id;
    const condition = await Plan.findAll({ where: { userId: id } });
    return res.json(condition);
  }
  async getOne(req, res) {
    const id = req.params.id;

    const plan = await Plan.findOne({ where: { id: id } });
    if (!plan || req.user.id !== plan.userId) {
      return res.json({ message: "plan is not found" });
    }
    return res.json(plan);
  }
  async delete(req, res) {
    try {
      const id = req.params.id;
      const deleted = await Plan.destroy({ where: { id: id } });
      if (!deleted) {
        return res.json({ message: "plan not found" });
      }
      return res.json({ message: "plan was deleted" });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = new PlanController();
