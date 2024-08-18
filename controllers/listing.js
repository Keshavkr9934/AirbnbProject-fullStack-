const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAPBOX_MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res, next) => {
    let allListing = await Listing.find({});
    return res.render("listings/index.ejs", { allListing })
}

module.exports.newRout = async (req, res, next) => {
    res.render("listings/new.ejs");
};

module.exports.postNewRout = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.location,
        limit: 1
    })
        .send();
    let filenames = req.file.filename;
    let urls = req.file.path;
    let { title, description, filename, url, price, location, country } = req.body;  //new Listing(req.body.listing)  await Listing.save()
    // console.log(result);
    let newuser = new Listing({                                                                     //for sortcut to store the data we use                                              
        title: title,
        description: description,
        image: {
            filename: filenames,
            url: urls
        },
        price: price,
        location: location,
        country: country,
    });
    newuser.owner = req.user._id;
    newuser.geometry = response.body.features[0].geometry;
    let savedListing = await newuser.save();
    req.flash("success", "created new listing");
    res.redirect("/listing");
};

module.exports.showRout = async (req, res, next) => {
    let { id } = req.params;
    let data = await Listing.findById(id).populate({ path: "review", populate: { path: "Author" } }).populate("owner");
    if (!data) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listing");
    }
    // console.log(data);
    res.render("listings/show.ejs", { data });
};

module.exports.editRout = async (req, res, next) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    // console.log(data);
    // console.log(data.description);
    if (!data) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listing");
    }
    let originalImage = data.image.url;
    let originalmageUrl = originalImage.replace("/upload", "/upload/h_300,w_300");
    res.render("listings/edit.ejs", { data, originalmageUrl });

};

module.exports.updateRout = async (req, res, next) => {
    let { id } = req.params;
    let listins = await Listing.findByIdAndUpdate(id, { ...req.body });  //some change like here to be ...req.body.listing
    if (typeof req.file !== "undefined") {
        let filenames = req.file.filename;
        let urls = req.file.path;
        listins.image.filename = filenames;
        listins.image.url = urls;
        await listins.save();
    }
    req.flash("success", "Listing Updated Success!");
    res.redirect(`/listing/${id}`);
};

module.exports.deleteRout = async (req, res, next) => {
    let { id } = req.params;
    let delet = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted !");
    res.redirect("/listing");
    // console.log(delet);/
};