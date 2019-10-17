General Guidelines

Create a working proof of concept of the application which meets all of the minimum requirements. You
can use many different programming languages to complete the assignment, but the majority of the
code-base should be in C#, C, and/or C++.
The application should be sent with the following:
 All of the source code required for running and/or building the application
 A completed binary of the application (if applicable)
 Any required database files (if applicable)
The application requires​ a README​. Please ensure the README​ includes the following components:
 How to use/test​ the provided application
 What Operating System (+ service pack) and libraries are required
 Any design decisions or behavioral clarifications​ that illustrate how your program functions and
why
 If you use any external libraries or code-snippets, you must ​provide the following information
for each (credit must be given to others):
o Name
o Version
o Purpose
o License
o Website(s)
 What tools/libraries (and versions) are necessary to use and test your application
Note: Please ensure any database used will be easy for us to set up and use and is documented in the
README (self-contained databases like SQLite and LevelDB are far easier to setup than MySQL,
PostgreSQL, or other hosted databases).
----------------------------------------------------------------------------------------------------------
POSTCARD CREATOR (WEB)

Create a desktop application that takes image input from the user (e.g. drag and drop, file upload,
camera, etc.), modifies the image, and sends it as an email to a specified recipient. The application must
be created using ASP.NET Core and AngularJS frameworks.
Minimum Requirements
 Captures image data from the user (preferably from a webcam)
 Modifies the image data to contain a message
o This must be done on-screen.
 The application sends an email containing the modified image as an attachment
 On-screen instructions / help
 Graceful error handling
Bonus Points
 History of previously sent images
 Full unit tests
 Integration test procedures
 Capture multiple images and create a gif
 Geotag images
----------------------------------------------------------------------------------------------------------
<packages>
  <package id="Angular.UI.Bootstrap" version="2.5.0" targetFramework="net461" />
  <package id="AngularJS.Animate" version="1.7.8" targetFramework="net461" />
  <package id="AngularJS.Core" version="1.7.8" targetFramework="net461" />
  <package id="AngularJS.KendoUI" version="1.0.3" targetFramework="net461" />
  <package id="AngularJS.Resource" version="1.7.8" targetFramework="net461" />
  <package id="AngularJS.Route" version="1.7.8" targetFramework="net461" />
  <package id="AngularJS.Sanitize" version="1.7.8" targetFramework="net461" />
  <package id="angular-local-storage" version="0.7.0" targetFramework="net461" />
  <package id="bootstrap" version="3.4.1" targetFramework="net461" />
  <package id="jQuery" version="3.4.1" targetFramework="net461" />
  <package id="KendoUICore" version="2019.3.917" targetFramework="net461" />
  <package id="popper.js" version="1.14.0" targetFramework="net461" />
</packages>