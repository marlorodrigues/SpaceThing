const express = require('express');
const List = require('../models/list')

module.exports = {

    async createThing(req, res) {
        try {
            const { thing } = req.body

            // const createdThing = await List.create(thing)

            console.log(thing)

            return res.send()

        } catch (error) {
            return res.status(400).send({ error: "Failed to Create Thing" });
        }
    },

    async editThing(req, res) {
        try {

        } catch (error) {
            return res.status(400).send({ error: "Failed to Edit Thing" });
        }
    },

    async deleteThing(req, res) {
        try {

        } catch (error) {
            return res.status(400).send({ error: "Failed to Delete Thing" });
        }
    },

    async showMeOneThing(req, res) {
        try {

        } catch (error) {
            return res.status(400).send({ error: "Failed to get Thing" });
        }
    },

    async showMeAllThings(req, res) {
        try {

        } catch (error) {
            return res.status(400).send({ error: "Failed to get Thing" });
        }
    },

}