const Instructor = require('./models/instructor');

const instructorController = {
    all (req, res) {
        // Returns all products
        Instructor.find({})
            // alongside it's manufacturer
            // information
            .populate('manufacturer')
            .exec((err, products) => res.json(products))
    },
    byId (req, res) {
        const idParam = req.params.id;
        // Returns a single product
        // based on the passed in ID parameter
        Instructor
            .findOne({_id: idParam})
            // as well as it's manufacturer
            .populate('manufacturer')
            .exec( (err, product) => res.json(product) );
    },
    create (req, res) {
        const requestBody = req.body;
        // Creates a new record from a submitted form
        const newInstructor = new Instructor(requestBody);
        // and saves the record to
        // the data base
        newInstructor.save( (err, saved) => {
            // Returns the saved product
            // after a successful save
            Instructor
                .findOne({_id: saved._id})
                .populate('manufacturer')
                .exec((err, Instructor) => res.json(Instructor));
        } )
    },
    update (req, res) {
        const idParam = req.params.id;
        let Instructor = req.body;
        // Finds a product to be updated
        Instructor.findOne({_id: idParam}, (err, data) => {
            // Updates the product payload
            data.name = Instructor.name;
            data.image = Instructor.image;
            data.price = Instructor.price;
            data.manufacturer = Instructor.manufacturer;
            // Saves the product
            data.save((err, updated) => res.json(updated));
        })
    },
    remove (req, res) {
        const idParam = req.params.id;
        // Removes a product
        Instructor.findOne({_id: idParam}).remove( (err, removed) => res.json(idParam) )
    }
};

module.exports = instructorController;
