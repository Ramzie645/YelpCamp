const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')
const axios = require('axios').default;

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const sample = array => array[Math.floor(Math.random() * array.length)]


const SeedDB = async () => {
    await Campground.deleteMany({});
    for(let i =0; i < 50; i++){
      const random1000 = Math.floor(Math.random() * 1000)
      const price = Math.floor(Math.random() * 20 + 10)
      const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: '//api.unsplash.com/photos/random',
            description: '  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet molestiae eligendi est eos, expedita enim, saepe cum, amet sunt hic eaque. Commodi suscipit corrupti,magnam ducimus hic velit deleniti atque.',
            price: 15.99
        })
        await camp.save();
    }
}


SeedDB().then(() => {
    mongoose.connection.close();
})
