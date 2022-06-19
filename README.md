# The Stones Project (work in progress)

## Table of Content

-   [The Project](#the-project)
-   [Live Demo](#live-demo)
-   [The Story Behind](#the-story-behind)
-   [The Idea](#the-idea)

## The Project <a name="the-project"></a>

For my final project at the SPICED Academy, I realized an old idea for a _Guerilla Performance_. [See below](#the-story-behind) to read the whole story behind.

In general, this web application works as a texture editor for 3D meshes. I picked [React.js](https://reactjs.org/) as a framework because the user should be able to claim a mesh, paint it and store it into a gallery. The user will need a valid email address to claim a mesh, so in the future [AWS](https://aws.amazon.com/) will be involved to realize the email verification. The functionality to react to the painted textures of other users will also be added.
For now, because the final project was supposed to be finished in 6 days, I decided to start with the main challenge and the main functionality: The feature to edit the texture of the mesh, to save it to a [PostgreSQL](https://www.postgresql.org/) database and load it from there.

To create the [WebGl](https://en.wikipedia.org/wiki/WebGL) elements of the page I decided for a framework called [Three.js](https://threejs.org/), more specific it's adaption for React.js called [React-Three-Fiber](https://github.com/pmndrs/react-three-fiber).

To improve the performance of the application, I chose to use [glTF](https://en.wikipedia.org/wiki/GlTF) as the file format of the mesh. The information of a glTF file is stored in JSON format, which allows an easy manipulation of the mesh properties. The mesh itself is stored as a base64 code within the glTF file. The texture is also stored to the database as a base64 PNG to prevent the usage of an external photo bucket and long loading times.

Take a look at the [Live Demo](http://stones-project.herokuapp.com/) on _Heroku_. <a name="live-demo"></a>

## The Story Behind <a name="the-story-behind"></a>

In 2016 I met [Julia Sher](https://de.wikipedia.org/wiki/Julia_Scher) during her exhibition at [Natalia Hug](https://nataliahug.com/) gallery in Cologne. At that time, her work _Warning: Always There_ was on display (see photo).

<img src="https://64.media.tumblr.com/b22aa2bda21a622f8137eb21cdaa168e/tumblr_o2kbdkcx8q1s7hj73o1_1280.jpg" width="300"/>

We spent the evening together, and before we divided, she asked me to do her a favor:

> "Could you please go back to that bed, take of your shirt and pose a bit for me? I am seriously bored by all those people just sitting down on that bed taking a selfie and nothing happening. I'd really love to have something exciting recorded on the tapes."

Well, I went back, but as my Alter Ego _Jerome Daly_ with a heart printed on a big transparent to do some... things and a friend to take photos. We didn't inform the gallerist beforehand. So I just went inside, did my thing on that bed, and we took some Polaroids. The _Guerilla Performance_ was born.

However, the gallerist forgot to switch on the recorders on that day, but the Polaroids remain with Julia until today (see photo).

<img src="https://64.media.tumblr.com/39d3a909ecb363678ffdb826d92abd50/tumblr_o2v8holdFz1s7hj73o1_640.jpg" width="250"> <img src="https://64.media.tumblr.com/0b758ba6a5c60ad7e58220cd42d6db59/tumblr_o2v8holdFz1s7hj73o2_640.jpg" width="250"> <img src="https://64.media.tumblr.com/de2929ca54b78f398bf012b6d026690a/tumblr_o2v8holdFz1s7hj73o3_640.jpg" width="250">

## The Idea <a name="the-idea"></a>

This brought me to the idea to do more performances like that. One of the ideas was to create a website where people can claim 3D models of stones and paint them, that I will later 3D print and deploy at a gallery during an opening.

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
