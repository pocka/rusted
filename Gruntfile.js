module.exports=function(grunt){
	grunt.initConfig({
		babel:{
			options:{
				presets:['es2015']
			},
			dist:{
				files:{}
			}
		},
		esteWatch:{
			options:{
				dirs:['src/**/'],
				livereload:{
					enable:false
				},
				ignoredFiles:['*4913','.swp']
			},
			js:function(path){
				var files={};
				files[path.replace('src','lib')]=path;
				grunt.config(['babel','dist','files'],files);
				return 'babel';
			}
		}
	});

	grunt.loadNpmTasks('grunt-este-watch');
	grunt.loadNpmTasks('grunt-babel');

	grunt.registerTask('default',['esteWatch']);
};
