'use strict';

/* wyszukanie wszystkich linków - test
document.getElementById('test-button').addEventListener('click', function (){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
})
*/

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked');
  console.log('event');

  /* <DONE> remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* <DONE> add class 'active' to the clicked links */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* <DONE> remove class 'active' from all articles */
  const activeArticle = document.querySelectorAll('.posts article.active');
  console.log(activeArticle);
  for (let activeArticle of activeArticles) {         //activeArticles 
    activeArticle.classList.remove('active');
  }

  /* <DONE> get 'href' attribute from the clicked links */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* <DONE>find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(articleSelector);

  /* <DONE> add class 'active' to the correct article */
  targetArticle.classList.add('active');

}

/* Gen Title List */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags.list',
  optArticleAuthorSelector = '.post-author',
  optAuthorListSelector = '.list.authors',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';


const generateTitleLinks = function (customSelector = '') {

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector + customSelector);
  titleList.innerHTML = '';


  /* for each article */
  let html = '';
  const articles = document.querySelectorAll(optArticleSelector );
  for (let article of articles) {

    /* get article id */

    const articleId = article.getAttribute('id');

    /* find title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* create HTML of the link */

    /* insert link into titleList */

    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;


  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

const calculateTagClass = function(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumer = Math.floor(percentage * (optCloudClassCount - 1) + 1 );
  //return value
  return optCloudClassPrefix + classNumer;
}


/* Generate Tags */
const calculateTagsParams = function(tags){
  const params = {
    max: 0,
    min: 999999,
  }
  for(let tag in tags){
    console.log(tag + 'is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }

  return(params);
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  console.log('tagsParams', tagsParams);

  /* find all articles */

  const articles = document.querySelectorAll('.post');
  console.log(articles);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find tags wrapper */

    const tagWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagWrapper);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagArray);

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {

      /* generate HTML of the link */

      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.tagLink(linkHTMLData);
      console.log(linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    /* END LOOP: for each tag */
  }
  /* insert HTML of all the links into the tags wrapper */

  tagWrapper.innerHTML = html;

  /* END LOOP: for every article: */
}

/* [NEW] find list of tags in right column */
const tagList = document.querySelector('.tags');

/* [NEW] add html from allTags to tagList */
// tagList.innerHTML = allTags.join(' ');
// console.log(allTags);

const tagsParams = calculateTagsParams(allTags);
// console.log('tagsParams:', tagsParams);

/* [NEW] create variable for all links HTML code */
let allTagsHTML = '';

/* START LOOP: for each tag in allTags: */
for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
  const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
  console.log('tagLinkHTML:', tagLinkHTML);

  // allTagsHTML += tag + ' (' + allTags[tag] + ') ';
  allTagsHTML += tagLinkHTML;

  const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParam) + '</li>';
  console.log('tagLinkHTML:', tagLinkHTML);
}
/* [NEW] END LOOP: for each tag in allTags: */

/* [NEW] add HTML from allTagsHTML to tagList */
tagList.innerHTML = allTagsHTML;

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-]');

  /* START LOOP: for each active tag link */
  for(let activeTagLinks of activeTagLinks){

  /* remove class active */
    activeTagLinks.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const foundTagLinks = document.querySelectorAll('a.active[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let foundTagLinks of foundTagLinks){

  /* add class active */
  foundTagLinks.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('data-tags~="' + tag + '"]');
}
/* wywołanie funkcji "generateTitleLinks" z atrybutem który będzie selektorem atrybutów */
generateTitleLinks('[data-tags~="' + tag + '"]');

function addClickListenersToTags() {
  /* find all links to tags */
  const linkTags = document.querySelectorAll('a[href^="#tag="]');

  /* START LOOP: for each link */
  for(let linkTag of LinkTags){

  /* add tagClickHandler as event listener for that link */
  linkTag.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}
generateTags();
addClickListenersToTags();

/* Generate Authors */
function generateAuthors(){

  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* find every author */
  const articles = document.querySelectorAll(optArticleSelector);

  /*START LOOP for every authon */
  for(let article of articles){
    
    /* find authors wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorWrapper);

    /* generate HTML of the link */
    let html ='';

    /* get author from data-tags attribute */
    const tagAuthor = article.getAttribute('data-author');

    /* generate HTML of the link */
    const linkHTMLData = { id: tagAuthor, title: tagAuthor };
    const linkHTML = templates.AuthorLink(linkHTMLData);

    /* add generated code to html variable */
    html = html + linkHTML;

    /* [NEW] check if the link is not already in allAuthors */
    if(!allAuthors[tagAuthor]){

      /* [NEW] add generated code to allAuthors array */
      allAuthors[tagAuthor] = 1;
    } else {
      allAuthors[tagAuthor]++;
    }
  }
  /* END LOOP: for each tag */

  authorWrapper.innerHTML = html;

  /* END LOOP: for every article: */
}

generateAuthors();

