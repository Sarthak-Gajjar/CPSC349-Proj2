// https://jsonplaceholder.typicode.com/guide/

async function downloadPosts (page = 1) {
  const postsURL = `https://jsonplaceholder.typicode.com/posts?_page=${page}`
  const response = await fetch(postsURL)
  const articles = await response.json()
  return articles
}

async function downloadComments (postId) {
  const commentsURL = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  const response = await fetch(commentsURL)
  const comments = await response.json()
  return comments
}

async function getUserName (userId) {
  const userURL = `https://jsonplaceholder.typicode.com/users/${userId}`
  const response = await fetch(userURL)
  const user = await response.json()
  return user.name
}

function getArticleId (comments) {
  const article = comments.previousElementSibling
  const data = article.dataset
  return data.postId
}

const details = document.getElementsByTagName('details')
for (const detail of details) {
  detail.addEventListener('toggle', async event => {
    if (detail.open) {
      const asides = detail.getElementsByTagName('aside')
      const commentsWereDownloaded = asides.length > 0
      if (!commentsWereDownloaded) {
        const articleId = getArticleId(detail)
        const comments = await downloadComments(articleId)
        console.log(comments)
      }
    }
  })
}

const posts = await downloadPosts()
console.log(posts)

posts.forEach(async (element) => {
  var main = document.createElement("main");

  //Creating the article with other tags
  var article = document.createElement("article");
  var header = document.createElement("h2");
  var authorSpan = document.createElement("span");
  var authorAside = document.createElement("aside");
  var paragraph = document.createElement("p");
  
  //Setting the data-post-id to current element's id
  article.setAttribute("data-post-id", element.id);

  //Setting header to current element's title
  header.innerHTML = element.title;
  
  
  //Replacing the <br>
  var content = (element.body).split('\n').join('<br>');
  paragraph.innerHTML = content;

  //Getting author name
  authorSpan.innerHTML = await getUserName(element.userId);
  
  //Adding "by" before author name
  var by = document.createTextNode("by ")
  authorAside.appendChild(by)
  authorAside.appendChild(authorSpan);
  
  //Making the changes to article
  article.appendChild(header);
  article.appendChild(authorAside);
  article.appendChild(paragraph);


  //Adding the details section
  var detail = document.createElement('details')
  var summary = document.createElement('summary')
  var section = document.createElement('section')
  var header1 = document.createElement('header')
  var h3 = document.createElement('h3')


  // Adding summary to detail
  var text = document.createTextNode("See what our readers had to say...")
  summary.appendChild(text)
  detail.appendChild(summary)

  //Adding Comments in header in section in detail
  var headertext = document.createTextNode("Comments")
  h3.appendChild(headertext)
  header1.appendChild(h3)
  section.appendChild(header1)
  detail.appendChild(section)

  

  //Adding article and detail
  main.appendChild(article)
  main.appendChild(detail)


   var commentst = document.createElement('aside')
  

const details = document.getElementsByTagName('details')
for (const detail of details) {

  detail.addEventListener('toggle', async event => {
    if (detail.open) {

      let commentst = document.createElement('aside')
      section.appendChild(commentst)

      const asides = detail.getElementsByTagName('aside')
      const commentsWereDownloaded = asides.length > 0
      if (!commentsWereDownloaded) {
        const articleId = getArticleId(detail)
        const comments = await downloadComments(articleId)
        console.log(comments)
        
        commentst.innerHTML(comments)

      }
    }
  })

}    
    


  
  //Making changes to the document 
  document.body.appendChild(main);
  

});
