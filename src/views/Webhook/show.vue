<template>
	<div class="content">
		<div class="row">
			<div class="col-md-12">
				<div class="box box-solid">
					<div class="box-header with-border">
						<h3 class="box-title">{{model.name}}</h3>
						<div class="box-tools pull-right">
							<router-link :to="{name: 'Webhook'}" class="btn btn-default btn-sm">Back</router-link>
						</div>
					</div>
					<div class="box-body">
						<table class="table table-hover">
							<thead>
								<tr>
									<th v-for="th in theads">{{ th }}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{{ model.name }}</td>
									<td> {{ model.url}} </td>
									<td>{{ model.count }}</td>
									<td>{{ model.type }}</td>
									<td>
										<i :class="{
											'fa fa-circle': true,
											'text-success': model.status == 1,
											'text-danger': model.status == 0
										}"></i>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return{
				model: {},
				theads: ['Name', 'Url', 'Count', 'Type', 'Status']
			}
		},
		created(){
			this.fetchData()
		},
		methods: {
			fetchData(){
				axios.get('api/v1/site/' + this.$route.params.id).then(response => {
					this.model = response.data
				}).catch(error => {
					console.log(error.response)
				})
			}
		}
	}
</script>