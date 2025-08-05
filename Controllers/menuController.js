const Menu = require('../Models/Menu');
const { findByIdAndDelete } = require('../Models/User');

const getMenu = async (req, res) => {
    try{
        // Fetching all menu items from DB
        const menu = await Menu.find()

        res.status(200).json({
            success: true,
            message: menu
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



const addDish = async (req, res) => {
    try{
        const { name, price, description } = req.body

        console.log("check")
        const dish = await Menu({name, price, description}).save()
        console.log(dish)
        res.status(201).json({
            success: true,
            message: dish
        })

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// Write a route to edit a dish
const editDish = async (req, res) => {
    try{
        const dish = await Menu.findByIdAndUpdate(req.params.id, req.body, { new : true });
        
        res.status(200).json({
            success: true,
            message: dish
        })
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// Write a route to delete a dish
const deleteDish = async (req, res) => {
    try{
        const dish = await Menu.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            success: true,
            message: dish
        })
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }


}

module.exports = { getMenu, addDish, editDish, deleteDish }