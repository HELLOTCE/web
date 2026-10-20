# Figma Guide: Recreate the Login Page and Dashboard

> This project does **not** include a Figma design file. This guide explains how to make one yourself.
> Open the running website (http://localhost:3000) side by side as a reference.

## Setup
1. Sign in at https://www.figma.com and click **New design file**.
2. Press **F** (Frame tool) and choose **Desktop** (1440 x 1024) from the right panel. Rename it `Login Page`.
3. Create a second Desktop frame named `Dashboard`.

## Colours and text (used in both pages)
| Use | Colour |
|---|---|
| Accent (buttons, logo) | `#6C5CE7` |
| Light accent (backgrounds) | `#EFECFF` |
| Text | `#2D3748` |
| Border | `#E2E8F0` |
| Page background | `#FFFFFF` |

Font: **Arial** (or Inter). Headings 24 px bold, body 15 px.

## Login page frame
1. Set the frame fill to `#EFECFF`.
2. Draw a **Rectangle** (R) 400 x 480, fill `#FFFFFF`, corner radius 10, stroke `#E2E8F0`. Centre it in the frame.
3. Add **Text** (T): "Student Portal" (logo, 26 px bold, `#6C5CE7`), and "Sign In" (heading).
4. Add two labels ("Email", "Password") and below each a rectangle 336 x 40 (white fill, `#E2E8F0` stroke, radius 6).
5. Add a small square for the **Remember me** checkbox with its text, and "Forgot password?" text on the right in `#6C5CE7`.
6. Draw a button rectangle 336 x 44, fill `#6C5CE7`, radius 6, with white text "Sign in".
7. Add a small note: "Email and password format check only; no account authentication".
8. Select shapes and press **Ctrl + Alt + G** (Auto layout is **Shift + A**) to space things evenly.

## Dashboard frame
1. **Sidebar:** rectangle 230 x 1024 at the left, fill `#EFECFF`. Add the logo text and three text items: About, Student Form, Student Records. Give the active item a `#6C5CE7` rectangle with white text.
2. **Welcome message:** text "Welcome, Student!" at the top of the content area (24 px bold).
3. **Three cards:** rectangles 220 x 100, white fill, `#E2E8F0` stroke, radius 8, with a 4 px `#6C5CE7` bar on top. Inside add a large number and a label (e.g. 120 / Total Students). Create one card, then duplicate it with **Ctrl + D**.
4. **Recent activity table:** heading "Recent Activity", then a header row (fill `#EFECFF`) with Date / Activity / Status and 3-4 rows below. Use lines or thin rectangles between rows.

## Finish
- Rename layers clearly (Sidebar, Card 1, Login Button).
- Optional: turn the Sign in button into a **Component** (Ctrl + Alt + K) and link the Login frame to the Dashboard frame using the **Prototype** tab (drag the arrow from the button to the Dashboard frame, trigger "On click").
- Present with the **Play** button at the top right.
