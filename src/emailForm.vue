<template>
  <div class="emailForm">
		<p>Join our mailing list:</p>
		<p></p>
    <input type="email" name="email" id="email" placeholder="Email Address"/>
    <input name="firstName" id="firstName" placeholder="First Name"/>
		<button id="signUpForMail">Join the Mailing List!</button>
	</div>	
</template>

	<script>
		function validateEmail(email) {
    var email = document.getElementById('txtEmail');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    	while (!filter.test(email.value)) {
      	alertify.error('Please provide a valid email address');
      	email.focus;
      	return false;
    	}
      alertify.success("Looks good! We will send you a verifcation email");
      return true; 	
    }
  export default {
		name: 'emailForm',
		methods: {}
	}
	
	</script>
	<style>
		background-image: url("http://wallup.net/wp-content/uploads/2016/01/52676-digital_art-simple_background.png");
	</style>