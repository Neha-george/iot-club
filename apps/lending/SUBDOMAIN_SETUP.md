# Subdomain Setup Guide

Follow these instructions to host the Lending App on its own subdomain (e.g., `lending.iot-club.web.app`), keeping your main domain free for your Landing Page.

## 1. Create the Subdomain (Site)
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on **Hosting** in the sidebar.
3. Scroll down to the **Advanced** section (or look for the dashboard).
4. Click **"Add another site"**.
5. Give it a name, for example: `iot-club-lending`
   - Your URL will be: `https://iot-club-lending.web.app`

## 2. Link Your Code to the Subdomain
In your VS Code terminal (inside `iot-club-register` folder):

1. **Apply the Target**:
   This tells Firebase that the logical name "lending" refers to the site you just created.
   Replace `iot-club-lending` with the actual name you created in step 1.

   ```powershell
   npx firebase target:apply hosting lending iot-club-lending
   ```

2. **Verify Configuration**:
   I have already updated your `firebase.json` to include `"target": "lending"`. You can check it:
   ```json
   "hosting": {
     "target": "lending",
     "public": "dist",
     ...
   }
   ```

## 3. Deploy
Now, when you deploy, it will automatically go to your new subdomain.

1. **Build the latest code**:
   ```powershell
   npm run build
   ```

2. **Deploy**:
   ```powershell
   npx firebase deploy --only hosting
   ```
   *Since we set the target, this command knows exactly where to push the files.*

## Summary
- **Main Page**: You will create a separate project folder for this later and deploy it to the default site (`iot-club.web.app`).
- **Lending Page**: hosted at `iot-club-lending.web.app` (This project).
- **Membership Page**: You will create another site (`iot-club-membership`) and deploy a separate folder there.
