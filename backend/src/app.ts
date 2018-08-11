const feathers = require('@feathersjs/feathers');

// import express from '@feathersjs/express';
// import from '@featherjs/configuration'
const express        = require( '@feathersjs/express');
const configuration  = require('@feathersjs/configuration');
const cors           = require('cors');
const helmet         = require('helmet');
const logger         = require('winston');

const settings : any = configuration();
const app : any = express(feathers());

app.configure(settings);
app.use(cors());
app.use(helmet());

app.use('/', express.static(app.get('public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());

export default app;
