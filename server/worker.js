require('dotenv').config();
const kue = require('kue');
const cluster = require('cluster');

const nodemailer = require('nodemailer');

const jobs = kue.createQueue();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

const clusterWorkerSize = require('os').cpus().length;

if (cluster.isMaster) {
  kue.app.listen(3001);
  console.log('UI started on port 3001');

  for (let i = 0; i < clusterWorkerSize; i += 1) {
    cluster.fork();
  }
} else {
  jobs.process('testing', 4, (job, done) => {
    const { title, message } = job.data;
    console.log(`Starting ${title}`);
    console.log(`Execute testing jobs...`);

    transporter.sendMail(message, (err, info) => {
      if (err) console.log(err);
      else console.log(info);

      done();
    });
  });
}
