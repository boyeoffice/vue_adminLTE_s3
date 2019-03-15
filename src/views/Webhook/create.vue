<template>
	<div class="content">
	<div class="col-md-8">
		<div class="box box-solid">
			<div class="box-header with-border">
				<h3 class="box-title">Create site</h3>
			</div>
			<div class="box-body">
				<form class="form-horizontal">
					<div class="form-group">
						<label class="col-lg-3" for="name">Name</label>
						<div class="col-md-9">
							<input type="text" class="form-control" v-model="form.name">
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-3" for="url">Url</label>
						<div class="col-md-9">
							<input type="text" class="form-control" v-model="form.url">
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-3" for="type">Type</label>
						<div class="col-md-9">
							<input type="text" class="form-control" v-model="form.type">
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-3">Status</label>
						<div class="col-lg-9">
							<select2 v-model="form.status">
								<option value="0">Disable</option>
								<option value="1">Activate</option>
						    </select2>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="col-md-4">
		<div class="box box-solid">
			<div class="box-header with-border">
				<router-link :to="{name: 'Webhook'}" class="btn btn-default">
					Back
				</router-link>
				<button v-if="vissibleButton" class="pull-right btn btn-primary" @click="createSite">Save</button>
				<button v-else class="btn btn-primary pull-right" disabled="">
					Please wait <i class="fa fa-circle-o-notch fa-spin"></i>
				</button>
			</div>
		</div>
	</div>
</div>
</template>

<script type="text/javascript">
	import Select2 from '@/components/Select2'
	export default {
		components: {
			Select2
		},
		data(){
			return{
				form: {},
				vissibleButton: true
			}
		},
		methods: {
			createSite(){
				this.vissibleButton = false
				axios.post('api/v1/site', this.form).then(response => {
					this.$router.push('/webhook')
				}).catch(error => {
					this.vissibleButton = true
					console.log(error.response)
				})
			}
		}
	}
</script>