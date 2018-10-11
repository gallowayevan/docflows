<?php
require('connection.php');

$specialty_code = $_GET['specialty']; 
$physician_code = $_GET['physician'];
$state = $_GET['state'];
$calculation = $_GET['calculation'];

    	if($calculation == "import"){    	
	    	$sql = "select initial_state as state, count, ratio as measure";
	    	$sql .= " from imports where specialty_code = :specialty_code and physician_code = :physician_code";
	    	$sql .= " and final_state = :state";
    	
	    	$stmt = $pdo->prepare($sql);
			$stmt->execute(['specialty_code' => $specialty_code, 'physician_code' => $physician_code, 'state' => $state]);

    	} elseif ($calculation == "export"){
	    	$sql = "select final_state as state, count, ratio as measure";
	    	$sql .= " from exports where specialty_code = :specialty_code and physician_code = :physician_code";
	    	$sql .= " and initial_state = :state";

	    	$stmt = $pdo->prepare($sql);
			$stmt->execute(['specialty_code' => $specialty_code, 'physician_code' => $physician_code, 'state' => $state]);

        } elseif ($calculation == "retention"){  
	    	$sql = "select initial_state as state, count, ratio as measure";
	    	$sql .= " from exports where specialty_code = :specialty_code and physician_code = :physician_code";
	    	$sql .= " and final_state = initial_state";

	    	$stmt = $pdo->prepare($sql);
			$stmt->execute(['specialty_code' => $specialty_code, 'physician_code' => $physician_code]);

    	} elseif ($calculation == "netToAll"){

	    	$sql = "select initial_state as state, count, ratio as measure";
	    	$sql .= " from nets where specialty_code = :specialty_code and physician_code = :physician_code";
	    	$sql .= " and final_state = initial_state";

	    	$stmt = $pdo->prepare($sql);
			$stmt->execute(['specialty_code' => $specialty_code, 'physician_code' => $physician_code]);

    	} else {
	    	$sql = "select final_state as state, count, ratio as measure";
	    	$sql .= " from nets where specialty_code = :specialty_code and physician_code = :physician_code";
	    	$sql .= " and initial_state = :state";

	    	$stmt = $pdo->prepare($sql);
			$stmt->execute(['specialty_code' => $specialty_code, 'physician_code' => $physician_code, 'state' => $state]);
        }


$results=$stmt->fetchAll(PDO::FETCH_ASSOC);
$json=json_encode($results);

echo $json;

?>