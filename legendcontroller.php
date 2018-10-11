<?php
require('connection.php');

function makeFloat($v){
	return floatval($v);
}

function deleteZero($v){
	return $v != 0;
}

function array_median($arr) {
    $count = count($arr); //total numbers in array
    $middleval = floor(($count-1)/2); // find the middle value, or the lowest middle value
    if($count % 2) { // odd number, middle is the median
        $median = $arr[$middleval];
    } else { // even number, calculate avg of 2 medians
        $low = $arr[$middleval];
        $high = $arr[$middleval+1];
        $median = (($low+$high)/2);
    }
    return $median;
}

$specialty_code = $_GET['specialty']; 
$physician_code = $_GET['physician'];
$calculation = $_GET['calculation'];

    $specialtyOperator = '!=';
    $calculationOperator = '!=';

    if ($specialty_code == 0) {
        $specialtyOperator = '=';
    }

    if($calculation == 'retention' || $calculation == 'netToAll') {
        $calculationOperator = '=';
    }

    if($calculation == "import"){
        $calculation = "imports";
    } else if($calculation == "export"){
        $calculation = "exports";
    } else if($calculation == "netToAll"){
        $calculation = "nets";
    } else if($calculation == "net"){
        $calculation = "nets";
    } else {
        //retention
        $calculation = "exports";
    }

    $sql = "select ratio as measure from ".$calculation." where initial_state".$calculationOperator." final_state AND physician_code = :physician_code and specialty_code".$specialtyOperator."0";

	$stmt = $pdo->prepare($sql);
	$stmt->execute(['physician_code' => $physician_code]);

	$results=array_column($stmt->fetchAll(PDO::FETCH_ASSOC), 'measure');

	$results=array_map("makeFloat", $results);
	$results=array_filter($results, "deleteZero");
	
	$max=max($results);
	$min=min($results);

	sort($results);
	$arrayLength = count($results);

	$median = array_median($results);


$json=json_encode(['median'=>$median, 'max'=>$max, 'min'=>$min]);

echo $json;

?>