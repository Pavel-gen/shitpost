const { Train } = require("../models/models");

class TrainController {
  async start(req, res) {
    const { plan_id } = req.body;
    const id = req.user.id;
    const train = await Train.create({
      userId: id,
      planId: plan_id,
    });
    return res.json(train);
  }
  async getAll(req, res) {
    const id = req.user.id;
    const condition = await Train.findAll({ where: { userId: id } });
    return res.json(condition);
  }
  async getOne(req, res) {
    const id = req.params.id;

    const train = await Train.findOne({ where: { id: id } });
    if (!train || req.user.id !== train.userId) {
      return res.json({ message: "train is not found" });
    }
    return res.json(train);
  }
  async delete(req, res) {
    try {
      const id = req.params.id;
      const deleted = await Train.destroy({ where: { id: id } });
      if (!deleted) {
        return res.json({ message: "train not found" });
      }
      return res.json({ message: "train was deleted" });
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async addSet(req, res) {
    const id = req.params.id;
    const updated = await Train.update(req.body, { where: { id: id } });
    if (updated == 0) {
      return res.json({ message: "SMTH wrong" });
    }
    return res.json({ message: "All ok" });
  }
}

module.exports = new TrainController();
