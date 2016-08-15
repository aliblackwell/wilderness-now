[![Build Status](https://travis-ci.org/aliblackwell/wilderness-now.svg?branch=master)](https://travis-ci.org/aliblackwell/wilderness-now)

# Wilderness Now

The site is served using Amazon S3.

The 'develop' branch is where the majority of development work takes place.

The 'master' branch is our staging branch, and should be production-ready.

Images and fonts are served from Amazon Cloudflare. Instructions for uploading images to follow.

### Making changes

Check out this guide to understand the Github Flow:

https://guides.github.com/introduction/flow/

To make changes, create a new branch (based off either gh-pages or master) using the dropdown menu on the repository homepage. Call it 'your-name/what-you-are-updating'.

Make your changes and commit them into your branch.

Once you are finished, create a pull request into the master branch. All Pull Requests need to be reviewed! Once your branch has been merged into the master branch, it is ready to go live.

### Site Architecture

Coming soon

curl -I -s -X GET -H "Origin: www.github.com" http://d3fybqvnrweshl.cloudfront.net/fonts/Oswald.ttf

### NB

Had to update path to image_optim: ln -s /Users/AlasdairBlackwell/.rvm/gems/ruby-2.3.0/bin/image_optim /usr/local/bin/image_optim
