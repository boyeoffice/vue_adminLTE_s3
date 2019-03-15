<template>
	<section class="content">
		<div class="row">
			<div class="col-md-8">
				<div class="box box-solid">
				<div class="box-header with-border">
					<h3 class="box-title">{{ title }}</h3>
					<div class="box-tools pull-right">
						<div class="btn-group">
							<button class=" btn btn-default dropdown-toggle" data-toggle="dropdown" type="button">Options <span class="caret"></span></button>
							<ul class="dropdown-menu dropdown-menu-arrow pull-right">
								<li><a href="javascript:void(0)" v-on:click="showField = false">Hide password field</a></li>
								<li><a href="javascript:void(0)" v-on:click="showField = true">Show password field</a></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="box-body">
					<form action="" class="form-horizontal">
						<div :class="{'form-group': true, 'has-error': errors.name}">
							<label for="" class="col-lg-4">Full Name <i class="fa fa-info-circle uses-tooltip" data-toggle="tooltip" data-original-title="Full Name"></i></label>
							<div class="col-lg-8">
								<input type="text" class="form-control" v-model="form.name">
							</div>
						</div>
						<div :class="{'form-group': true, 'has-error': errors.username}">
							<label for="" class=" col-lg-4">Username <i class="fa fa-info-circle uses-tooltip" data-toggle="tooltip" data-original-title="Username"></i></label>
							<div class="col-lg-8">
								<input type="text" class="form-control" v-model="form.username">
							</div>
						</div>
						<div :class="{'form-group': true, 'has-error': errors.email}">
							<label for="" class=" col-lg-4">Email <i class="fa fa-info-circle uses-tooltip" data-toggle="tooltip" data-original-title="Email"></i></label>
							<div class="col-lg-8">
								<input type="text" class="form-control" v-model="form.email">
							</div>
						</div>
						<div v-show="showField" :class="{'form-group': true, 'has-error': errors.old_password}">
							<label for="" class=" col-lg-4">Old Password <i class="fa fa-info-circle uses-tooltip" data-toggle="tooltip" data-original-title="Password"></i></label>
							<div class="col-lg-8">
								<input type="password" class="form-control" v-model="form.old_password">
							</div>
						</div>
						<div v-show="showField" :class="{'form-group': true, 'has-error': errors.password}">
							<label for="" class=" col-lg-4">New Password <i class="fa fa-info-circle uses-tooltip" data-toggle="tooltip" data-original-title="Password"></i></label>
							<div class="col-lg-8">
								<input type="password" class="form-control" v-model="form.password">
							</div>
						</div>
						<div v-show="showField" :class="{'form-group': true, 'has-error': errors.password}">
							<label for="" class=" col-lg-4">Repeat Password <i class="fa fa-info-circle uses-tooltip" data-toggle="tooltip" data-original-title="Repeat Password"></i></label>
							<div class="col-lg-8">
								<input type="password" class="form-control" v-model="form.password_confirmation"> 
							</div>
						</div>
					</form>
				</div>
				<div class="box-footer">
					<div class="form-group pull-left" style="margin-bottom: 0px;">
						<router-link to="/cp" class="btn btn-default">Cancel</router-link>
					</div>
					<div class="form-group pull-right" style="margin-bottom: 0px;">
						<button class="btn btn-primary" v-if="isSaving" disabled><i class="fa fa-circle-o-notch fa-spin"></i></button>
						<button class="btn btn-primary" v-else @click="Save">Save</button>
					</div>
				</div>
			   </div>
			</div>
			<div class="col-md-4">
				<div class="box box-solid">
                    <div class="box-header with-border">
                        <h3 class="box-title">Profile picture</h3>
                    </div>
                    <div class="box-body">
						<div 
							v-if="profile.avatar === null"
							class="avatar-placeholder"
							@click="showModal = true">
							<div v-if="progressBar" class="progress">
                                <div class="progress-bar" 
                                    role="progressbar" 
                                    aria-valuenow="60" aria-valuemin="0" 
                                    aria-valuemax="100" :style="{width: progressBar}">
                                    {{progressBar}}
                                </div>
                            </div>
                            <span v-else class="text-center">
                                <i class="fa fa-camera"></i>
                                 Change picture
                            </span>
						</div>
						<div
							v-else
							class="avatar"
							:style="{backgroundImage: 'url(' + profile.avatar_m + ')'}"
							@click="showModal = true">
							<div v-if="progressBar" class="progress">
                                <div class="progress-bar" 
                                    role="progressbar" 
                                    aria-valuenow="60" aria-valuemin="0" 
                                    aria-valuemax="100" :style="{width: progressBar}">
                                    {{progressBar}}
                                </div>
                            </div>
                            <span v-else class="text-center">
                                <i class="fa fa-camera"></i>
                                 Change picture
                            </span>
						</div>
                    </div>
                </div>
			</div>
		</div>
		<modal 
			v-if="showModal" 
			@close="showModal = false"
			@set-featured="setAvatar"/>
		
	</section>
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from '@/components/ImageModal'
	export default {
		components: {
			Modal
		},
		data(){
			return {
				form: {},
				title: 'Profile',
				errors: {},
				store: '/api/user',
				method: 'post',
				showField: false,
				isSaving: false,
                showButton: true,
				progressBar: null,
				showModal: false,
				avatar: null,
				placeHolder: '@/assets/default.png'
			}
		},
		created(){
			this.fetchProfile()
		},
		methods: {
			Save: function() {
				this.isSaving = true
				this.form.edit_password = this.showField
				return new Promise(() => {
					axios[this.method](this.store, this.form).then(response => {
						this.$store.dispatch('getProfile')
						this.isSaving = false
						toastr.success('Profile updated!')
					}).catch(error => {
						this.isSaving = false
					    this.errors = error.response.data.errors
					})
				})
			},
			fetchProfile(){
				return new Promise(() => {
					axios.get(this.store).then(response => {
						this.form = response.data
					})
				})
            },
			setAvatar(item){
				this.avatar = item
				this.showModal = false
				return new Promise(() => {
					axios.post('api/v2/avatar', item, {
						onUploadProgress: uploadEvent => {
                             this.progressBar = Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%'
                        }
					}).then(response => {
						this.$store.dispatch('getProfile')
						this.progressBar = null
					}).catch(error => {
						this.progressBar = null
					})
				})
			}
		},
		computed:
    	mapGetters(['profile'])
	}
</script>