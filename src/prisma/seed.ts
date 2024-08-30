import client from "./client";

async function main(){
    const user = await client.user.create({
        data:{
            name: "Masha",
            email: "yahdn@ghms.vmn",
            password: "12345",
            avatar: "https://cdn-icons-png.freepik.com/512/781/781240.png",
            posts: {
                create: {
                    title: "this is post 1",
                    body: " whatever you want to know you wont know",
                    image: "https://cdn-icons-png.freepik.com/512/15203/15203755.png",
                    datePublished: "08.06.2010",
                    timePublished: "19:32",
                    comments: {
                        create: {
                            title: "My comment",
                            body: " this comment is the first and the best",
                            datePublished: "09.06.2010",
                            timePublished: "08:22",
                            authorId: 1
                        }
                    }
                }
            }

        }
    })
    console.log(user)
}

main()