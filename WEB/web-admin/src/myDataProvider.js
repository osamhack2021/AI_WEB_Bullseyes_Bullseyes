import drfProvider from 'ra-data-django-rest-framework';
const INITIAL = "https://osamhack2021-ai-web-bullseyes-bullseyes-pjw6w945935xx-8000.githubpreview.dev"
const dataProvider = drfProvider(INITIAL);

const myDataProvider = {
    ...dataProvider,
    create: (resource, params) => {
        
        if (!params.data.photourl  ) {
            // fallback to the default implementation
            return dataProvider.create(resource, params);
        }
        /**
         * For posts update only, convert uploaded image in base 64 and attach it to
         * the `picture` sent property, with `src` and `title` attributes.
         */
        let pictures = [params.data.photourl];
        // Freshly dropped pictures are File objects and must be converted to base64 strings
        const newPictures = pictures.filter(
            p => p.rawFile instanceof File
        );
    
        return Promise.all(newPictures.map(convertFileToBase64))
            .then(base64Pictures =>
                base64Pictures.map(picture64 => (dataProvider.create(resource, {
                    ...params,
                    data: {
                        ...params.data,
                        photourl: picture64
                    },
                })))
            )
    },   
};

const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file.rawFile);
    });
export default myDataProvider;