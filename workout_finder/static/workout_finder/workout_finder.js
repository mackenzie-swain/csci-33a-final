document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#beginWorkoutBtn').style.display = 'none';
    document.querySelector('#continueWorkoutBtn').style.display = 'none';
    document.querySelector('#completeWorkoutBtn').style.display = 'none';
    document.querySelector('#addExerciseBtn').style.display = 'none';
    document.querySelector('#complete-alert').style.display = 'none'; 

    
    document.querySelector('#createWorkoutBtn').addEventListener('click', create_workout);
    document.querySelector('#beginWorkoutBtn').addEventListener('click', start_workout);
    document.querySelector('#continueWorkoutBtn').addEventListener('click', continue_workout);
    document.querySelector('#completeWorkoutBtn').addEventListener('click', complete_workout);
    document.querySelector('#addExerciseBtn').addEventListener('click', add_exercise);
});

workout = [];

function create_workout() {
    document.querySelector('#exercise-container').style.display = 'block';
    document.querySelector('#createWorkoutBtn').style.display = 'none';
    document.querySelector('#beginWorkoutBtn').style.display = 'block';
    document.querySelector('#addExerciseBtn').style.display = 'block';
    document.querySelector('#continueWorkoutBtn').style.display = 'none';
    document.querySelector('#completeWorkoutBtn').style.display = 'none';

    const exerciseDiv = document.createElement('div');
    fetch('/exercises')
    .then(response => response.json())
    .then(exercises => {

        for(i = 0; i < 5; i++) {
            const index = Math.floor(Math.random() * exercises.length);
            workout.push(exercises[index]);
            exerciseDiv.innerHTML += `<div class="card">
                <b>${exercises[index].name}</b><p>${exercises[index].description}</p><p>Reps:${exercises[index].reps}</p>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
        }

        document.querySelector('#exercise-container').append(exerciseDiv);
    });
}

function start_workout() {
    document.querySelector('#exercise-container').style.display = 'block';
    document.querySelector('#exercise-container').innerHTML= '';
    document.querySelector('#createWorkoutBtn').style.display = 'none';
    document.querySelector('#beginWorkoutBtn').style.display = 'none';
    document.querySelector('#continueWorkoutBtn').style.display = 'block';
    document.querySelector('#completeWorkoutBtn').style.display = 'none';
    document.querySelector('#addExerciseBtn').style.display = 'none';

    const exerciseDiv = document.createElement('div');

    exerciseDiv.innerHTML += `<h2>${workout[0].name}</h2><p>${workout[0].description}</p><p>Reps: ${workout[0].reps}</p>`

    workout.shift();

    document.querySelector('#exercise-container').append(exerciseDiv);
}

function continue_workout() {
    document.querySelector('#exercise-container').style.display = 'block';
    document.querySelector('#exercise-container').innerHTML= '';
    document.querySelector('#createWorkoutBtn').style.display = 'none';
    document.querySelector('#beginWorkoutBtn').style.display = 'none';
    document.querySelector('#addExerciseBtn').style.display = 'none';
    
    const exerciseDiv = document.createElement('div');

    if(workout.length > 0) {
        document.querySelector('#continueWorkoutBtn').style.display = 'block';
        exerciseDiv.innerHTML += `<h2>${workout[0].name}</h2><p>${workout[0].description}</p><p>Reps: ${workout[0].reps}</p>`
    } else {
        document.querySelector('#continueWorkoutBtn').style.display = 'none';
        document.querySelector('#completeWorkoutBtn').style.display = 'block';
        document.querySelector('#complete-alert').style.display = 'block';   
    }

    workout.shift();

    document.querySelector('#exercise-container').append(exerciseDiv);
}

function complete_workout() {
    document.querySelector('#beginWorkoutBtn').style.display = 'none';
    document.querySelector('#continueWorkoutBtn').style.display = 'none';
    document.querySelector('#completeWorkoutBtn').style.display = 'none';
    document.querySelector('#complete-alert').style.display = 'none'; 
    document.querySelector('#addExerciseBtn').style.display = 'none';
    document.querySelector('#createWorkoutBtn').style.display = 'block';
}

function add_exercise() {
    const exerciseDiv = document.createElement('div');
    fetch('/exercises')
    .then(response => response.json())
    .then(exercises => {

        const index = Math.floor(Math.random() * exercises.length);
        workout.push(exercises[index]);
        exerciseDiv.innerHTML += `<div class="card">
            <b>${exercises[index].name}</b><p>${exercises[index].description}</p><p>Reps:${exercises[index].reps}</p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;

        document.querySelector('#exercise-container').append(exerciseDiv);
    });
}
