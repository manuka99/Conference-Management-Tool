import React from "react";
//import {Link} from "react-router-dom";

export default function Footer(){
    return (
        <div>
            <br/>
            <br/>
            <footer class="footer-04 bg-light">
			<div class="container">
				<div class="row">
					<div class="col-md-6 col-lg-3 mb-md-0 mb-4">
						<h2 class="footer-heading"><a href="#" class="logo">Colorlib</a></h2>
						<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
						<a href="#">read more <span class="ion-ios-arrow-round-forward"></span></a>
					</div>
					<div class="col-md-6 col-lg-3 mb-md-0 mb-4">
						<h2 class="footer-heading">Categories</h2>
						<ul class="list-unstyled">
              <li><a href="#" class="py-1 d-block">Buy &amp; Sell</a></li>
              <li><a href="#" class="py-1 d-block">Merchant</a></li>
              <li><a href="#" class="py-1 d-block">Giving back</a></li>
              <li><a href="#" class="py-1 d-block">Help &amp; Support</a></li>
            </ul>
					</div>
					<div class="col-md-6 col-lg-3 mb-md-0 mb-4">
						<h2 class="footer-heading">Tag cloud</h2>
						<div class="tagcloud">
	            <a href="#" class="tag-cloud-link">Workshop 1</a><br/>
	            <a href="#" class="tag-cloud-link">Workshop 1</a><br/>
	            <a href="#" class="tag-cloud-link">Workshop 1</a><br/>
	            <a href="#" class="tag-cloud-link">Workshop 1</a><br/>
	            <a href="#" class="tag-cloud-link">Workshop 1</a><br/>
	            <a href="#" class="tag-cloud-link">Workshop 1</a><br/>
	            <a href="#" class="tag-cloud-link">Workshop 1</a><br/>
	            <a href="#" class="tag-cloud-link">Workshop 1</a><br/>
	          </div>
					</div>
					<div class="col-md-6 col-lg-3 mb-md-0 mb-4">
						<h2 class="footer-heading">Subcribe</h2>
						<form action="#" class="subscribe-form">
              <div class="form-group d-flex">
                <input type="text" class="form-control rounded-left" placeholder="Enter email address"/>
                <button type="submit" class="form-control submit rounded-right"><span class="sr-only">Submit</span><i class="ion-ios-send"></i></button>
              </div>
            </form>
            <h2 class="footer-heading mt-5">Follow us</h2>
            <ul class="ftco-footer-social p-0">
              <li class="ftco-animate"><a href="#" data-toggle="tooltip" data-placement="top" title="Twitter"><span class="ion-logo-twitter"></span></a></li>
              <li class="ftco-animate"><a href="#" data-toggle="tooltip" data-placement="top" title="Facebook"><span class="ion-logo-facebook"></span></a></li>
              <li class="ftco-animate"><a href="#" data-toggle="tooltip" data-placement="top" title="Instagram"><span class="ion-logo-instagram"></span></a></li>
            </ul>
					</div>
				</div>
			</div>
			<div class="w-100 mt-5 border-top py-5">
				<div class="container">
					<div class="row">
	          <div class="col-md-6 col-lg-8">

	            <p class="copyright">
	  Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="ion-ios-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib.com</a>
	  </p>
	          </div>
	          <div class="col-md-6 col-lg-4 text-md-right">
	          	<p class="mb-0 list-unstyled">
	          		<a class="mr-md-3" href="#">Terms</a>
	          		<a class="mr-md-3" href="#">Privacy</a>
	          		<a class="mr-md-3" href="#">Compliances</a>
	          	</p>
	          </div>
	        </div>
				</div>
			</div>
		</footer>

        </div>
    )
}