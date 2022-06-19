# The Stones Project (work in progress)

## Table of Content

-   [The Story Behind](#the-story-behind)
-   [The Idea](#the-idea)
-   [The Project](#the-project)
-   [Live Demo](#live-demo)

## The Story Behind <a name="the-story-behind"></a>

In 2016 I met [Julia Sher](https://de.wikipedia.org/wiki/Julia_Scher) during her exhibition at [Natalia Hug](https://nataliahug.com/) gallery in Cologne. At that time, her work _Warning: Always There_ was on display (see photo).

<img src="https://64.media.tumblr.com/b22aa2bda21a622f8137eb21cdaa168e/tumblr_o2kbdkcx8q1s7hj73o1_1280.jpg" width="300"/>

We spent the evening together, and before we divided, she asked me to do her a favor:

> "Could you please go back to that bed, take of your shirt and pose a bit for me? I am seriously bored by all those people just sitting down on that bed taking a selfie and nothing happening. I'd really love to have something exciting recorded on the tapes."

Well, I went back, but as my Alter Ego _Jerome Daly_ with a heart printed on a big transparent to do some... things and a friend to take photos. We didn't inform the gallerist beforehand. So I just went inside, did my thing on that bed, and we took some Polaroids. The _Guerilla Performance_ was born.

However, the gallerist forgot to switch on the recorders on that day, but the Polaroids remain with Julia until today (see photo).

<img src="https://64.media.tumblr.com/39d3a909ecb363678ffdb826d92abd50/tumblr_o2v8holdFz1s7hj73o1_640.jpg" width="300"> | <a href="https://64.media.tumblr.com/0b758ba6a5c60ad7e58220cd42d6db59/tumblr_o2v8holdFz1s7hj73o2_640.jpg" width="300">

## The Idea <a name="the-idea"></a>

This brought me to the idea to do more performances like that. One of the ideas was to create a website where people can claim 3D models of stones and paint them, that I will later 3D print and deploy at a gallery during an opening.

## The Project <a name="the-project"></a>

For my final project at the SPICED Academy, I remembered this idea and dived into [React-Three-Fiber](https://github.com/pmndrs/react-three-fiber) to create an editor for the stones. In one week, I was able to display the glTF of a Stone and create a connection to a canvas element. The user is able to paint the stone and save the texture to a PostgreSQL database as a base64 code. On the next page, the texture will be loaded from the database and displayed.
However, user login and all the functionality around a real website where people can share the stones and react to them still needs to be done.

Take a look at the [Live Demo](http://stones-project.herokuapp.com/) on _Heroku_. <a name="live-demo"></a>

### DEVELOPER NOTES

IMPLEMENT NEXT:

-   the functionality claim a stone with a valid email address
-   a gallery of all painted stones
-   maybe the functionality to comment / react to painted stones

NOTES WEBPACK CONFIG:

SECURITY:

-   "csurf"
-   "cookie-session"
-   "bcryptjs"
-   "spiced-pg"
-   "uid-safe"

DEPRECATED:

-   "@babel/polyfill"
-   "@types/react-router-dom"
-   "redux-devtools-extension" - use "@redux-devtools/extension" instead!

CHECK FOR ALTERNATIVES IF NEEDED!

NOT NEEDED(?):

-   "compression"
-   "crypto-random-string"
-   "css-loader"

USE:

-   "mini-css-extract-plugin" - create seperate css files for each component!

DOESN'T WORK! CHECK FOR ALTERNATIVES!

TEST IF NEEDED:

-   "multer"
-   "uid-safe"
-   "web-vitals"

INSTALL LATER IF NEEDED:

-   "socket.io"
-   "socket.io-client"
