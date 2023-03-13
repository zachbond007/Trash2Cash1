## To change app version:

1. for Android -> android>app>build.gradle
   defaultConfig {
   ...
   versionCode 2 //
   versionName "1.0.1"
   ...
   }

#### In-App Purchase

follow installation part from the link given below-
https://react-native-iap.dooboolab.com/docs/intro/

useEffect(() => {
initConnection();
}, []);

const initConnection = async () => {
try {

<!-- provide you the connection here whether it is 'true' or 'false' -->

const result = await RNIap.initConnection();
} catch (err) {
}
};

-> to get details of all productIDs
Android:
RNIap.getSubscriptions()
iOS:
RNIap.getProduct()

-> to purchase particular subscription
Android:
RNIap.requestSubscription({skus: productId})
iOS:
RNIap.requestSubscription({skus: productId, andDangerouslyFinishTransactionAutomaticallyIOS: false})

-> to finish the transiction
RNIap.finishTransaction(productId, true);

-> Getting History of Purchased Products from Google
RNIap.getPurchaseHistory();
RNIap.getAvailablePurchases();

-> to get reciept of transaction
purchaseUpdateSubscription = RNIap.purchaseUpdatedListener((purchase) => {
const receipt = purchase.transactionReceipt;
receipt
if (receipt) {
// share this receipt to backend for validation
RNIap.finishTransaction(purchase);
}
});
purchaseErrorSubscription = RNIap.purchaseErrorListener((err) => {
if (!(err["responseCode"] === "2")) {
Alert.alert(
"Error",
"There has been an error with your purchase, error code",
err["code"]
);
}
});

<!-- Validate IAP -->

## iOS

-> Apple Store Connect >> Subscriptions >> 'Manage' under 'App-Specific Shared Secret' field >> Click Generate >>Share secret key to backend
->

<!-- Submitting Application on TestFlight for Distribution -->

If used IAP : Tell them how you are using IAP in you application
-> What are the effects of IAP on your app
-> Who are allowed to use Subscription
-> Also attach Image of the snapshot of screens where you are buying Plans/Products
-> Snapshot submitting in Apple store connect must not contain any dummy data.
If accessing location, camera, file, contacts, etc
-> You need to let them know the purpose for accessing these.
-> Also you need to mention it under your Info.plist file of you application.
For Example: <key>NSLocationAlwaysUsageDescription</key>
<string>My description about why I need this capability</string>
Location (When in use):
<key>NSLocationWhenInUseUsageDescription</key>
<string>My description about why I need this capability</string>
If DOB(Date of Birth) is accessed in your application:
-> Regarding 5.1.1, your app requires users to register with date of birth, which is not directly relevant to your app’s core functionality.
-> To resolve this issue, it would be appropriate to either remove user’s date of birth or make it optional in registration process.
