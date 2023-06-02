# Software Requirements

## Vision

### What is the vision of this product?

PlantPal is a cloud application with a mobile device frontend that enables a user to water their plants while they are at work, on vacation, or in the event of an emergency. Additionally, thep maintains logs of temperature, soil moisture, and watering history that are viewable in the mobile. PlantPal takes internet of things (IoT) technology in the form of a Raspberry Pi with temperature and moisture sensors, and an electric valve, and connects it to the user's mobile device using AWS services.

### What pain point does this project solve?

Having plants indoors or on the patio increases air quality in the home and improves quality of life. Homever, plants require constant care and maintaining them can be difficult for anyone who travels regularly, works long hours, or just wants to keep tabs on their plants. PlantPal takes the place of requesting favors from friends and family to keep the user's plants watered. It also mitigates taking the risk of not having a watering plan in place while away.

### Why should we care about your product?

It's planting season and living in the city, with a full schedule, doesn't mean you can't keep plants around the house, and keep them happy and healthy indefinitely.

## Scope (In/Out)

### IN - What will your product do

The Raspberry Pi will get temperature and soil moisture data and send it to a database via AWS Greengrass

The mobile app will display temperature and moisture data to the user

The mobile app will allow the user to water the plants remotely by pressing a button

The database will store records of temperature and moisture data along with watering history

The mobile app will have a records page that allows the user to see historical activity

### OUT - What will your product not do

The app will not have a desktop frontend (mobile only)

### Minimum Viable Product

User can water their plants with the mobile app

### What are your stretch goals?

User can define a watering schedule in the mobile app to water the plants automatically

### Functional Requirements

Raspberry Pi can send live temperature and moisture data to AWS  
AWS can send live temperature and moisture data to mobile app  
Mobile app can control Raspberry Pi water valve  
AWS can record temperature and moisture data in database when received  
AWS can record water on-off history in database  
Mobile app can access database records and show them to the user (7 days watering history)  

### Data Flow

User opens app  
App displays current temperature and moisture information received from Raspberry Pi via AWS  
User decides to water plants and pushes the button  
AWS greengrass tells Raspberry Pi to open water valve  
Water valve opens  
User releases button  
AWS greengrass tells Raspberry Pi to close water valve  
Water valve closes  
AWS logs watering event in database  

User navigates to history page  
Mobile app requests history records from database via AWS  
AWS returns database records to mobile app  
User views records  

### Non-Functional Requirements (301 & 401 only)

Requirement 1: Testability: End to End tests with Jest, mocks, spyOn

Raspberry Pi can get current temperature reading  
Raspberry Pi can get current soil moisture reading  
AWS greengrass can receive temperature and moisture readings  
AWS greengrass can post readings to database  
Mobile app can display temperature  
Mobile app can display soil moisture  
Mobile app can display history  
AWS greengrass can recognize button press  
AWS greengrass can send open and close instructions to Raspberry Pi  

Requirment 2: Usability: Mobile app works on both iOS and Android

App works in Expo Go on both OS  
App can be sideloaded on Android device and works  

App published to Android app store and can be downloaded (stretch goal)

© Code Fellows 2023
