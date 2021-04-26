# Knowyourvocab

A polish to english vocabulary assesment test, that estimates number of known words, as well as suggested study level.

For the backend see: [knowyourvocab-back](https://github.com/Wodorek/knowyourvocab-back)

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

A vocabulary assesment test I created to help my teacher girlfriend with the trasition from on-site to remote teaching.

The test portion of this website is meant to mimick the paper version of the evaluation, both the looks and function. Questions are on a short timer, and are divided into progressively harder levels. Upon completing every questions, or making a set number of mistakes, the student signs his or hers initials, and sends the test for teacher to take a look at.

The admin portion of this website is available to approved teachers only. There they can check how well the student did on each seperate level, and on the test as a whole, as well as see an estimate about a vocabulary size, and suggested study level for said student.

## Technologies used

- [React](https://github.com/facebook/react) v17.0.2
- [Typescript](https://github.com/microsoft/TypeScript) v3.8.3
- [Styled-components](https://github.com/styled-components/styled-components) v5.2.1
- [React-redux](https://github.com/reduxjs/react-redux) v7.2.3
- [React-hook-form](https://github.com/react-hook-form/react-hook-form) v7.2.3

## Setup

To run this project locally, clone it and install using npm:

```
$cd ../knowyourvocab
$npm install
$npm start
```

To be able to acces the admin part of the website, you will also need the backend part of the app: [knowyourvocab-back](https://github.com/Wodorek/knowyourvocab-back), and a .env file with **REACT_APP_BACKEND** variable, pointing to the backend URL.
