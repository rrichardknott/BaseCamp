const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connection");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "61aedb288c17545e75c043f3",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,

      description: `One of my favorite places for a weekend away, this is an easy trip from anywhere in the world. There are a couple good campsites here, but my favorite is Jumbo Rocks. Its massive boulders are great for exploring or watching the sunset. Like most of the best campgrounds in this area, it's a first-come, first-serve so if you’re planning to stay a weekend, get there early.  `,
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dkjeuhqog/image/upload/v1639409513/YelpCamp/s5gwatmlogp7m0golf3c.jpg",
          filename: "YelpCamp/s5gwatmlogp7m0golf3c",
        },
        {
          url: "https://res.cloudinary.com/dkjeuhqog/image/upload/v1639409513/YelpCamp/embddmdpsbmenfgzuqjh.jpg",
          filename: "YelpCamp/embddmdpsbmenfgzuqjh",
        },
      ],
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
