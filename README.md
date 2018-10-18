# it2810-webutvikling-h18-prosjekt-3-42
it2810-webutvikling-h18-prosjekt-3-42 created by GitHub Classroom

https://github.com/expo/expo/issues/946
Remember to use high accuracy if it fails to get current location


https://github.com/expo/expo/issues/426#issuecomment-319592189
It still wont work on some phones, but there doesn't seem to be anything we can do about it. I turned on high precision mode location service, turned it off, restarted the phone, turned on location service again and then it worked.

npm audit fix doesn't fix some vulnerabilities, but it is being worked on by smart people https://github.com/facebook/react-native/pull/21769

# Documentation

## App functionality and choices
The app we have made for this assignment is a todo-app that allows for much more advance tracking and sorting of the things you need to do, than your standard todo-app.
To add a new todo, you start by pressing the green +-button at the bottom left of the screen.


<img src="https://i.imgur.com/htMp5WW.jpg" alt="new todo" width="80px"/>

You are then taken to a page that allows you to add a new todo

<img src="https://i.imgur.com/cHuWQBu.jpg" width="200px" />

Here, you can enter a name for the todo, a description, as well as a location for where the todo will take place. This location can be an address "Storgata 1, Oslo", a place "Rema 1000 Elgeseter", or just a place name "Trondheim" or "Sweden". After typing in your desired location, remember to push the 🔎-icon in the searchbar. You can also set a priority for your todo that is either low, medium or high.
After saving your todo,  you will be taken back to the main page, where your todo will be displayed, ready for sorting or completing.

<img src="https://i.imgur.com/c7ODGjL.jpg" width="400px" />

The distance-field in the todo shows how far your current location is from the todo-location, so that you can sort your todos by which is closest. You can also sort on date, title, priority as well as when they were created. The pen icon allows you to edit your todo, as well as set it to completed. Completed todos will be moved to the bottom of the list, and the progress bar at the top will reflect how many of your active todos are completed.

<img src="https://i.imgur.com/bMfLB6U.jpg" width="200px" />

The map-button at the bottom of the screen, allows you to see your todos on a map.

<img src="https://i.imgur.com/iakfp53.jpg" width="200px" />


## Technology
### React Native
React Native was used to develop our app. This allowed for easy cross-platform development, using JavaScript and syntax that is very close to what you would use in web-development. JavaScript is a language all the group members were competent in from before, so the time spent on learning was minimized and development and planning could begin at the start of the assignment. Due to the short timeframe of this assignment, the use of react-native was very helpful in allowing us to get a working app up and running in the time frame that was expected of us, and the lessons learned from the previous assignment, could be applied to this assigment as well.
### Expo
[Expo](https://expo.io/)  is a toolchain that allows for easy development of cross-platform react-native apps. It also contains many useful components and APIs that allows use of native platform functionality. A number of these were used in this project, specifically the location API, the maps API and the permissions API. This will be further explained in the location part of the [Tutorials-section](#location)

## Work Methodology
### Git
We used Git to facility collaborative coding, as well as tracking features that need to be implemented and bugs that needed to be fixed. Branches were created for new features or large changes to existing features, form which pull requests were created. Another member of the group would then conduct a review of the code, before approving the pull request.

Commits were marked with issues so that it would be easy to see what was done in each commit. The use of issues also made it easy to distribute and assign tasks to group members and to get an overview of the work that was left.  

### Group work
In general, most of the coding was done through pair programming. This workflow worked well for our group. When this was not possible, code reviews were done through pull requests, to make sure that the code committed to master worked and didn't break any of the existing functionality, so that we always had a working version in the master-branch.

## Third party libraries
### react-native-paper
[react-native-paper](https://callstack.github.io/react-native-paper/) was used to get a cohesive look in the app, with designed components that follow Material Design guidelines, that is made to work cross-platform. Use of this library therefore made supporting both iOS and Android easier, as we could be sure that buttons, text inputs etc. would look the same and work the same across platforms.
### react-navigation
[react-navigation](https://reactnavigation.org/) was used to implement functionality for routing and navigating between the different screens in our app. This library allowed us to send props between screens, as well as an easy way to define navigation between screens with back buttons etc. Use of this library will be further described in the [Tutorials-section](#react-navigation).
### expo
As mentioned above, and in closer detail in the tutorials section below, a couple of the expo APIs were used to extend the functionality of our app with native functionality to the platform. The location API was used to lookup the GPS-coordinates of the users current location, as well as a functionality for geocoding an address to find it's coordinates. These two sets of coordinates could then be used to find the distance between the users current location and the todo-location.

To be allowed access to the users location, the permissions API in expo was used to get the location permission.

To display the todos on a map, the map API in Expo was used. This API will use either Google Maps or Apple Maps depending on the platform used.

## Tutorials
### react-navigation
### Location

## Testing
### Jest
### Android
### iOS
