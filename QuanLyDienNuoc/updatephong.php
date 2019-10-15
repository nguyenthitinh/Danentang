<?php 
	include 'connect.php';
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$username = $obj["username"];
	$idphong = $obj["idphong"];
	$tennguoithue = $obj["tennguoithue"];
	$tenphong = $obj["tenphong"];
	$giaphong = $obj["giaphong"];

	// $username = "a";
	// $idphong = "3";
	// $tennguoithue = "Hĩm";
	// $tenphong ="phòng 3" ;
	// $giaphong = "555555";


	//Lay iduser
	$sql1 = "SELECT id FROM user WHERE username ='$username'";
		$result1 = $db->query($sql1);
		if (mysqli_num_rows($result1) > 0) {
			while($row = $result1->fetch_assoc()) {
				$iduser = $row['id'];
			}
		}


	$result = "UPDATE phong SET tennguoithue = '$tennguoithue', tenphong = '$tenphong', giaphong = '$giaphong' WHERE idphong = '$idphong' AND iduser = '$iduser'";
	if ($db->query($result)) {
		$MSG = 'Update Done' ;
		$json = json_encode($MSG);
		echo $json ;	 
		}
	else{	 
		$MSGTry = 'Thử lại' ;
		$jsonTry = json_encode($MSGTry);
		echo $jsonTry ; 
	}
	
 	mysqli_close($db);
?>