import {Client,Databases,ID,Query} from 'appwrite'
const DATABASE_ID=import.meta.env.VITE_APPWRITE_DATABASE_ID
const PROJECT_ID=import.meta.env.VITE_APPWRITE_PROJECT_ID
const TABLE_ID=import.meta.env.VITE_APPWRITE_TABLE_ID
const client=new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)
const database=new Databases(client)
export const updateSearchCount=async(searchTerm,movie)=>{
    try{
        const result = await database.listDocuments({
            databaseId: DATABASE_ID,
            collectionId: TABLE_ID, // or tableId in newer SDKs
            queries: [Query.equal('searchTerm', searchTerm)],
        });
        if(result.documents.length>0){
            const doc=result.documents[0];
            await database.updateDocument({
                databaseId: DATABASE_ID,
                collectionId: TABLE_ID,
                documentId: doc.$id,
                data: { count: doc.count + 1 },
            });
        }else{
            await database.createDocument({
                databaseId: DATABASE_ID,
                collectionId: TABLE_ID,
                documentId: ID.unique(),
                data: {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                },
            });
        }
    }catch(error){
        console.log(error)
    }
    
}
export const getTrendingMovies=async()=>{
    try{
        const result=await database.listDocuments(DATABASE_ID,TABLE_ID,[Query.limit(5),Query.orderDesc("count")])
        return result.documents;
    }catch(error){
        console.log(error)
    }
}