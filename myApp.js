require('dotenv').config();
const mongoose = require('mongoose')

//imports Schema from Mongoose
const { Schema } = mongoose

const personSchema = new Schema({
  name : { type : String , required : true},
  age  :Number,
  favoriteFoods : [String]
})

//Creating a model from a Schema

const Person = mongoose.model('Person',personSchema);


//Creates and Saves a record of a model.
const createAndSavePerson = (done) => {
  var johnDoe = new Person({
    name : "John Doe",
    age : 21,
    favoriteFoods : ["fish","steak","eggs","chicken"]
  })

  johnDoe.save((err,data) => {
    if(err) return console.error(err);
    done(null,data)
  })

};

//Initialising array of many people.
var arrayOfPeople = [{ name : "Jane Austen" , age :78,favoriteFoods :["corn","beef","cauliflower"]},
{ name : "Charlotte Bronte",age:105, favoriteFoods :["wine","vegetable salads"]},
{ name :  "Andy Dwyer", age : 40, favoriteFoods : ["ugali","collard greens","Mulligans Steak"]}];

//Creates Many Records with Model.create() method.
const createManyPeople = (arrayOfPeople, done) => {
   Person.create(arrayOfPeople,(err,people) => {
       if(err) done(err);
       done(null,people);
   })
};

//Use Model.find() to search the Database.
const findPeopleByName = (personName, done) => {
  Person.find({ name : personName},(err,person) => {
    if(err) done(err);
    done(null,person);
  })
};

//Use MOdel.find() to find a single matching document in the Database.
const findOneByFood = (food, done) => {
   Person.findOne({ food :["wine"]},(err,food) => {
     if(err) done(err);
     done(null,food);
   })
};

//Use Model.findById() to search the Database using _id.
const findPersonById = (personId, done) => {
   Person.findById({_id : personId},(err,person) => {
     if(err) done(err)
     done(null,person)
   })
};

//Perform Update by running Find,Edit and Save.
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.find({_id:personId},(err,person) => {
    if(err) done(err)
     person.favoriteFoods.push(foodToAdd);

     person.save((err,updatedPerson) => {
      if(err) done(err)
      done(null,updatedPerson);
    })
  })

};

//Perform New Updates on a document by finding one and Updating.
//to return an updated document you should use { new : true}.
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.find({name : personName},{new : true},{age:ageToSet},(err,updatedDoc) => {
      if(err) done(err);
      done(null,updatedDoc);
  })
};

/* const findAndUpdate = (personId,done) => {
  const ageToSet = 20;
  Person.findByIdAndUpdate({ _id : personId},{new : true},{age : ageToSet},(err,updatedDoc) => {
    if(err) done(err)
    done(null,updatedDoc);
  })

}
*/

//Delete one document with Model.findByIdAndRemove()
const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id : personId},(err,removedDoc) =>{
    if(err) done(err);
    done(null,removedDoc);
  })
};

//Delete many documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name : nameToRemove},(err,removedPeople) => {
    if(err) done(err)
    done(null,removedPeople);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({food :foodToSearch})
        .sort({name:1})
        .limit(2)
        .select({age :0})
        .exec((err,people) => {
          if(err) console.log(err)
          done(null,people)
        })
};

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser : true});


//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
