const {Router} = require('express');
const { Item } = require("../models");
const express = require("express");
const { check, validationResult } = require("express-validator")

const itemRouter = Router();

// GET /item
itemRouter.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// GET item/:id
itemRouter.get("/:id", async (req, res, next) => {
  try {
      const found = await Item.findByPk(req.params.id);
      res.json(found)
  } catch (err) {
      next(err)
  }
})

// POST new Item
itemRouter.post("/", [
  check("name").not().isEmpty().trim().isString(),
  check("price").not().isEmpty().trim().isNumeric(),
  check("description").not().isEmpty().isString(),
  check("category").not().isEmpty().isString(), 
  check("image").not().isEmpty().isURL()
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    res.json({error:errors.array()})
  } else {
  try {
    const createdItem = await Item.create(req.body)
    res.json(createdItem)
  } catch (err){
    next(err)
  }
  }
})

// PUT update Item
itemRouter.put("/:id", [
  check("name").not().isEmpty().trim().isString(),
  check("price").not().isEmpty().trim().isNumeric(),
  check("description").not().isEmpty().isString(),
  check("category").not().isEmpty().isString(), 
  check("image").not().isEmpty().isURL()
], async (req,res,next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    res.json({error:errors.array()})
  } else {
  try{
    await Item.update(req.body, {where:{id:req.params.id}})
    const find = await Item.findByPk(req.params.id)
    res.json(find)
  } catch (err){
    next(err)
  }
}
})

// DELETE Item by ID
itemRouter.delete("/:id", async(req, res, next) => {
  try{
    await Item.destroy({where:{id:req.params.id}})
    const find = await Item.findAll()
    res.json(find)
  } catch (err){
    next(err)
  }
})


module.exports = itemRouter;