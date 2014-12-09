<?php

class TodoTableSeeder extends Seeder {
	public function run() {
		DB::table('todos')->delete();

		Todo::create(array(
			'order' => 0,
			'body' => 'learn angular',
			'completed' => 0
		));
		Todo::create(array(
			'order' => 1,
			'body' => 'learn directives',
			'completed' => 0
		));
		Todo::create(array(
			'order' => 2,
			'body' => 'become masters level at sc2',
			'completed' => 1
		));
	}
}