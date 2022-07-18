# Foli - Photo Library app
### Your Photo buddy
<hr>

Foli is a web application specializing in browsing and uploading images on your local storage, with beautiful layout and fast-forward hosting images.

[Visit Foli](https://daviddesar.github.io/foli/)
## 📝 Features
- Upload images from your devices (JPEG, JPG, PNG are allowed). **Prefer images with <1MB in file size to upload as many images as we can.**
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
- Layout images: I use `column-count` to layout images, dividing the layout to 3 columns at PC viewport (2 columns in tablet and 1 column in phone screen). Alternatively to `column-count` we can use `flex-box`  and `grid`. But it is kinda simple and easy to use when going with `column-count` and it seems entirely new to me so I wanna try this css property to the project.

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
- Add seeding images.
- Add a system design for the application: designing components and color scheme, then apply to the app using `@mui` theme


## ⚙️ About infinite scrolling
Because the application is not calling any http request, so I think there's no need for the infinite scrolling (yet this can be simulated by using `setTimeout`). I will briefly show the way to implement infinite scrolling using `IntersectionObserver`.

Firstly we need to paginate the data response from a server, spliting them into pages, eg:
```
{
  "pageNumber": 1,
  "pageSize": 3,
  "totaclCount": 100,
  "data": [
    {
      "id": 1,
      "name": "img #1",
      "description": "this is img 1"
    },
    {
      "id": 2,
      "name": "img #2",
      "description": "this is img 2"
    },
    {
      "id": 3,
      "name": "img #3",
      "description": "this is img 3"
    },
  ]
}
```

Then create a `loader` div tag with `ref` attached and place it at the end of `ImagesFeed` container:
```
App.tsx:


const [page, setPage] = useState(1);
const [imagesData, setImagesData] = useState([]);
// create ref for loader:
const loader = useRef(null);

// make request to get imagesData:
useEffect(() => {
	fetchData(page).then(res => setImagesData(imagesData.concat(res.data)));
}, [page]);

...
return (
	<Container>
		<ImagesFeedContainer>
			...
			<div ref={loader} />
		</ImagesFeedContainer>
	</Container>
)
```

Create a `observerCallback`, this function will be passed to observer instance later on:
```
const observerCallback = useCallback((entries) => {

	const target = entries[0];
	
	if (target.isIntersecting) {
		// when it reached the end of page: load the next page, then it will 
		// trigger re-rendering and call the fetchData hooks
		setPage((prev) => prev + 1);
	
	}

}, []);
```

Finally, we would implement observer in `useEffect` hooks:
```
useEffect(() => {
	// create intersection observer:
	const option = {  
	root: null,  
	rootMargin: "20px",  
	threshold: 0  
	};  
	const observer = new IntersectionObserver(observerCallback, option);
	// when the DOM done loading the loader div, we will observe it: 
	if (loader.current) observer.observe(loader.current);  
}, [handleObserver]);
```

=> In short, we will have a observer detecting scroll behavior, when user scroll to the end of page, it will automatically fetch data in the next page.

#### References:
- [MDN Intersection Observer docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#creating_an_intersection_observer);
