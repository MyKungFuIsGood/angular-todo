<?php

class TodoTableSeeder extends Seeder {
	public function run() {
		DB::table('todos')->delete();

		Todo::create(array(
			'body' => 'talk to cute girl',
			'completed' => 0
		));
		Todo::create(array(
			'body' => 'learn angular',
			'completed' => 0
		));
		Todo::create(array(
			'body' => 'become masters level at sc2',
			'completed' => 1
		));
	}
}