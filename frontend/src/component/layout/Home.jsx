import React, { Fragment } from 'react';
import './styles/home.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Product from '../products/Product';
import PhoneHeaderHome from './../layout/PhoneHeaderHome';
import CategoryInsideSlider from '../../generalComponent/CategoryInsideSlider';
import { Link } from 'react-router-dom';
import SimpleProductCard from '../../generalComponent/SimpleProductCard';
import CategoryHeader from './CategoryHeader';
import { useSelector } from 'react-redux';

const settings1 = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  focusOnSelect: true,
  mobileFirst: true,
  autoplaySpeed: 3000,
  arrows: true,
  responsive: [
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 4,
        arrows: false,
        autoplay: true,
      },
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 3,
        arrows: false,
        autoplay: true,
      },
    },
    {
      breakpoint: 330,
      settings: {
        slidesToShow: 2,
        arrows: false,
        autoplay: true,
      },
    },
    {
      breakpoint: 250,
      settings: 'unslick', // destroys slick
    },
  ],

  // prevArrow: true,
};
const featureSetting = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  focusOnSelect: true,
  mobileFirst: true,
  autoplaySpeed: 3000,
  arrows: true,

  // prevArrow: true,
};
const simpleProd = {
  dots: false,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  focusOnSelect: true,
  mobileFirst: true,
  autoplaySpeed: 3000,
  arrows: true,
  responsive: [
    {
      breakpoint: 1028,
      settings: {
        slidesToShow: 5,

        autoplay: true,
      },
    },
    {
      breakpoint: 620,
      settings: {
        slidesToShow: 4,

        autoplay: true,
      },
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 3,

        autoplay: true,
      },
    },
    {
      breakpoint: 330,
      settings: {
        slidesToShow: 2,

        autoplay: true,
      },
    },
    {
      breakpoint: 250,
      settings: 'unslick', // destroys slick
    },
  ],

  // prevArrow: true,
};

const Home = () => {
  const { products } = useSelector((state) => state.productsManagement);
  const { categories } = useSelector((state) => state.category);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      if (category.categoryImage.length > 0) {
        options.push({
          value: category._id,
          name: category.name,
          categoryImage: category.categoryImage,
          slug: category.slug,
        });
      }
      //console.log(category.categoryImage.length);
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  return (
    <Fragment>
      <PhoneHeaderHome />
      <CategoryHeader categories={categories} />
      <div className="home-feature">
        <Slider {...featureSetting}>
          <div className="home-feature__content">
            <img
              src="/s1.jpg"
              alt="Feature"
              className="home-feature__content-img"
            />
            <p className="home-feature__content-ad">?????????????? ??????????</p>
          </div>
          <div className="home-feature__content">
            <img
              src="/s2.jpg"
              alt="Feature"
              className="home-feature__content-img"
            />
            <p className="home-feature__content-ad">?????????????? ??????????</p>
          </div>
        </Slider>
      </div>

      <div className="categories-slider">
        <div className="category-content">
          <span className="category-content__header">Popular Category</span>
          <Link className="category-content__link" to="#">
            View all
          </Link>
        </div>
        <Slider {...settings1}>
          {categories.length > 0 &&
            createCategoryList(categories).map((category, i) => (
              <CategoryInsideSlider category={category} key={i} />
            ))}
        </Slider>
      </div>
      <div className="categories-slider">
        <div className="category-content">
          <span className="category-content__header">Popular Product</span>
          <Link className="category-content__link" to="#">
            View all
          </Link>
        </div>
        <Slider {...simpleProd}>
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
          <SimpleProductCard />
        </Slider>
      </div>
      <h4 className="text-align-center my-2">Latest product</h4>

      <Product products={products} />
    </Fragment>
  );
};

export default Home;
