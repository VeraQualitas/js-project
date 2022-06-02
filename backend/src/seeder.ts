import { possibility_answers, questions } from '@prisma/client';
import fs from 'fs';
import prisma from './utils/prisma';

const questions_data: Array<questions> = JSON.parse(
    fs.readFileSync(`${__dirname}/../_data/questions.json`, 'utf-8')
);

const possibility_answers_data: Array<possibility_answers> = JSON.parse(
    fs.readFileSync(`${__dirname}/../_data/possibility_answers.json`, 'utf-8')
);

async function importData(){
    let _ = await prisma.questions.createMany({data: questions_data});
    _ = await prisma.possibility_answers.createMany({data: possibility_answers_data});
}

async function deleteData(){
    let _ = await prisma.answer_details.deleteMany({});
    _ = await prisma.answers.deleteMany({});
    _ = await prisma.possibility_answers.deleteMany({});
    _ = await prisma.questions.deleteMany({});
}


if (process.argv[2] === '-i') {
    importData();
    console.log("imported all records");
  } else if (process.argv[2] === '-d') {
    deleteData();
    console.log("deleted all records");
  }