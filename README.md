# ACSG-515_Final-Project
DESCRIPTION: For my final project, I decided to create an inventory management system called Major Domo. While I originally planned 
to implement more features, I failed to anticipate the multitude of issues I would encounter while developing the application. As a 
result, there is no barcode scanning api integrated, nor a shopping cart feature. Also, there is no implemented way of doing push notifications 
to an email address. Finally, I was in the process of adding an in-line edit function, but ran out of time.

NOTE: You may need to download nodemon, yarn, and some modules. However, I believe most, if not all, of the modules can be downloaded 
with the "npm install" command while in the project root folder. You can install yarn using 
this guide: https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable 
Also, in my testing, I've needed to manually install nodemon on new machines. To install nodemon, you can run the following command: npm install -g nodemon

HOW TO LAUNCH: The first order of business is to download the project from GitHub. After doing so, you should use you command line to 
navigate to the root of the project.
When there, type "yarn dev". This should launch the local server. If the launch was successful, go into a browser of your choice and 
enter "http://localhost:3000". When the page loads up, you may need to wait a second (or refresh the page) for the items in 
the "Items in Collection" section to be fetched. However, this may be unnecessary.

LAUNCH QUICK GUIDE: 
Download project -> Open console -> Navigate to project root directory -> Run command: npm install -> Run command: yarn dev -> Open browser -> Navigate to http://localhost:3000

HOW TO USE: The features of Major Domo are as follows: you can see the item mongoDB collection, add items to the mongoDB collection, 
remove items from the mongoDB collection, export the collection to a CSV or JSON file, and decrement/increment the inline total for each 
item. All updates to items update the collection and are then reflected on the client side.

To input an item, enter the name of the item in the form that reads "Item Title, enter the expiration data in the form that 
reads "Expiration Date, and decide the amount of the item to add to the collection by clicking the buttons that read "-1" and "+1". The prior 
subtracts one, and the latter adds one to the input total.

To export the collection, click the button that says "EXPORT". You should then be shown a menu of two buttons that read "Export to CSV" 
and "Export to JSON". By clicking the "Export to CSV" button, a CSV file containing the collection should be downloaded. Alternatively, 
the "Export to JSON" button will download a JSON file containing the collection. You may need to allow pop-ups for the export features to work.

To do inline incrementations to an item in the collection, you should click the buttons that read "-1" and "+1" that are next to each item. The 
prior subtracts one and the latter adds one to the inline total.

To delete an item from the collection, click the inline delete button that is on that item's row in the "Items in Collection" section.
