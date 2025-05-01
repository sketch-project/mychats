<?php

namespace Database\Seeders;

use App\Models\ChatMessage;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ChatMessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $from = User::first();
        $users = User::whereNot('id', $from->id)->get();

        $data = [];
        foreach ($users as $key => $user) {
            $data[] = [
                'id' => Str::uuid(),
                'from_id' => $from->id,
                'to_type' => User::class,
                'to_id' => $user->id,
                'body' => fake()->sentence,
                'sort_id' => $key + 1
            ];
        }

        ChatMessage::insert($data);

        $time = 1;
        ChatMessage::all()
            ->each(function ($message) use (&$time, $from) {
                sleep(1);

                $message->update([
                    'seen_in_id' => json_encode([['id' => $from->id, 'seen_at' => now()]]),
                    'created_at' => now()->addMinutes($time),
                    'updated_at' => now()->addMinutes($time),
                ]);

                $time++;
            });
    }
}
