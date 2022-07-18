# Foli - Photo Library app
### Your Photo buddy
<hr>

Foli is a web application specializing in browsing and uploading images on your local storage, with beautiful layout and fast-forward hosting images.

[Visit Foli](https://daviddesar.github.io/foli/)

## 📝 Features
- Upload images from your devices (JPEG, JPG, PNG are allowed). **Perfer images with <1MB in file size to upload as many as images we can.**
- Preview image information from your homepage (hovering the image, if no information provided it will show nothing).
- Browsing images when clicking an image.
- In image slider: browsing image and edit image information; if you haven't added infomation, there's a "Add information" button.
- Layout your images without resizing them.
- Responsive for PC, Laptop, tablet and phone screens.

## 📦 Demo development
```
git clone git@github.com:daviddesar/foli
cd foli
npm i
```
If you encounter errors related to versioning, try this:
```
npm i --legacy-peer-deps
```

## 📑 Techical write up
- Firstly I started with `create-react-app` with `typescript` template to set up and bootstrap my React application.
- I use `@mui` as my UI library that helps me build UI component quickly, the lastest version supports both `styled-component` and `classes-to-component`.
- I stored the components in `components` folder and treat them like reusable components that you can use them anywhere by providing them props that required (similar to Lego toys concept).
- About the store-management engine, the application is quite simple so it is no need to go with this now, but as the application growing with complex logic as well as passing props into multiple layers of component we can consider `Redux/Redux toolkit` to deal with the state-management.
- Uploading images function: firstly select the file from device, then compress the image using `compressorjs`. Then convert the file to `FileUrl` type using `FileReader`. Then create an `ImageItem` object with `fileUrl` as well as `name` and `desc`, after that push them into current `images` (get from `localStorage`) and set the new `images` to `localStorage`.
- Layout images: I use `column-count` to layout images, dividing the layout to 3 columns at PC viewport (2 columns in tablet and 1 column in phone screen). Alternatively to `column-count` we can use `flex-box`  and `grid`. But it is kinda simple and easy to use when going with `column-count` and it is quite new to me that I wanna try once :).

## 🚀 Further improvement can be implemented
- Improve the image slider to fit the actual size of the image.
- Redesign the Image slider (It's kinda ugly :<)
- Add unit testing and e2e testing (Jest/Enzyme and Cypress).
- Add simple color filters to edit mode (using `<canvas>`)
- Have options for higher image resolution (add a Backend service and database for storing), this can extends the storage of images as well.
- Handle form validation when add/edit image information (name/description) for max length and default name when user leave the field untouched.
- Implement search feature: search feature by image's name or description.
- Implement hashtag: grouping images into tags (eg. #nature, #animals,... )
- Delete specific image.
- Create seeding image data option.
