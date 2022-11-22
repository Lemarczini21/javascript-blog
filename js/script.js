const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Link was clicked!");
  /* [DONE]remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll(".titles a.active");
  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }
  /* [DONE]add class 'active' to the clicked link */
  console.log("clickedElement:", clickedElement);
  clickedElement.classList.add("active");
  /* [DONE]remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".posts article.active");
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");
  console.log("href:", articleSelector);
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* add class 'active' to the correct article */
  targetArticle.classList.add("active");
};
// ZMIENNE
const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list";

/* 6.4. Generowanie listy tytułów */
function generateTitleLinks(customSelector = "") {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";
  /* for each article */
  let html = "";
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log("Custom selector:", customSelector);
  console.log("Const articles:", articles);
  //console.log(articles);
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute("id");
    //console.log(articleId);
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";
    /* insert link into titleList */
    /* insert link into html variable */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}
generateTitleLinks();

/* 7.2. Dodajemy tagi do artykułu */

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //onsole.log(articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapperList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = "";
    /* get tags from data-tags attribute */
    const tagsSelector = article.getAttribute("data-tags");
    //console.log(tagsSelector);
    /* split tags into array */
    const tagsArray = tagsSelector.split(" ");
    //console.log(tagsArray);
    /* START LOOP: for each tag */
    for (let tag of tagsArray) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + "</a><li>"; // ASK znak ucieczki przed "  dokladniej '"> zeby zgadzaly sie cudzyslowy bo wyrzuca blad w eslint'
      /* add generated code to html variable */
      html = html + linkHTML;
      /* END LOOP: for each tag */
    } // <-- koniec petli for for(let tag of tagsArray){ linia 101
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapperList.innerHTML = html; // ASK jak dodac spacje miedzy tagami? dodalem padding w css na tag <li>. Inne pomysly?
    /* END LOOP: for every article: */
  } // <-- koniec petli for (let article of articles){ start linia 87
}
generateTags();

//ZADANIE Dodajemy akcję po kliknięciu w tag

const tagClickHandler = function (event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  console.log("Clicked tag attribute:", href);
  //console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-", "");
  console.log("Make const tag:", tag);
  /* find all tag links with class active */
  const tagsActiveClass = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log("Tag with active class:", tagsActiveClass);
  /* START LOOP: for each active tag link */
  for (let tagActiveClass of tagsActiveClass) {
    /* remove class active */
    tagActiveClass.classList.remove("active");
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const linksHrefEqualHref = document.querySelectorAll(
    'a[href="' + href + '"]'
  );
  console.log("Links with href equal const href:", linksHrefEqualHref);
  /* START LOOP: for each found tag link */
  for (let linkHrefEqualHref of linksHrefEqualHref) {
    /* add class active */
    clickedElement.classList.add("active");
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
};
function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll(".list a");
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener("click", tagClickHandler);
    /* END LOOP: for each link */
  }
  console.log("Listener added");
}
addClickListenersToTags();
