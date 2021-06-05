import Datastore from 'nedb';

var actors = new Datastore({ filename: 'actor.db', autoload: true });