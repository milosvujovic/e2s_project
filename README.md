## Getting Started

Welcome to the E2S console application! The easiest way to get started is by following the steps in our team Wiki.

#### Pre-requisites

Your Cardiff University laptop should have the following tools installed. These will be required to work on the E2S project:

* Node JS 14.6.0 or newer

---

#### 1. Cloning the repository

Create a folder where you will store the project files. Inside this folder, launch a terminal windows and run the following command:

```
git clone https://git.cardiff.ac.uk/c2008927/e2s_project_team_1
```

#### 2. Install dependencies

Launch a new terminal window in e2s_app folder in the repository that was just cloned. Run the following command to install the required dependencies.

```
npm i
```

#### 3. Setup environment variables

The database keys are stored as local environment variables. These should never be stored in version control and are only provided in this Wiki for the purpose of assessment.

Locate the e2s-app folder. Create a new file called .env.local

In the file, add the following text:

```
DB_ACCESS_KEY_ID=AKIARMYDPO2OSGWIMAGZ
DB_SECRET_ACCESS_KEY=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
S3_ACCESS_KEY_ID=AKIARMYDPO2OSZNCLVBX
S3_SECRET_ACCESS_KEY=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
JWT_KEY=KHVdfjhbjbTKKGFjjfjt153876JHFDgy3gu6
HOST=http://localhost:3000
```

#### 4. Run the application

Run the following command to launch the application development server:

```
npm run dev
```

Go to [http://localhost:3000](http://localhost:3000) in your browser to view the application

### Project Requirements

The requirements of this project were tracked using Gitlab Issues. [Click here](https://git.cardiff.ac.uk/c2008927/e2s_project_team_1/-/boards) to go to our issue board.

### Important Assumptions

The client was unable to provide live examples of pieces of equipment/infrastructure producing usage readings. To model this, we created a script in Python that automatically saves mocked readings to the database.

You can learn more about how we do this [here](https://git.cardiff.ac.uk/c2008927/e2s_project_team_1/-/wikis/Mocking-Data-using-Lambda).

### Architecture Diagram

A C4 Model diagram of the application can be found [here](https://git.cardiff.ac.uk/c2008927/e2s_project_team_1/-/wikis/uploads/a8ccec10dcd325ba405b12db7e3e0ee4/E2S_C4_Model.pdf.pdf).

