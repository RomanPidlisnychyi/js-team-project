import headerMarkup from "../templates/htmlHeader.hbs";
import footerMarkup from "../templates/htmlFooter.hbs";
import apiServices from "./apiServices";

const refs = {
  header: document.querySelector(".header"),
  main: document.querySelector(".main"),
  footer: document.querySelector(".footer"),
  homeBtn: document.querySelector(".nav-menu__item--home"),
  libraryBtn: document.querySelector(".nav-menu__item--library"),
};

refs.header.insertAdjacentHTML("beforeend", headerMarkup());
refs.footer.insertAdjacentHTML("beforeend", footerMarkup());
