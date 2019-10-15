<?php 
	include 'connect.php';
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$username = $obj["username"];
	$iddn = $obj["iddn"];
	$thangnam = $obj["thangnam"];
	$tieude = $obj["tieude"];
	$chisocu = $obj["chisocu"];
	$chisomoi = $obj["chisomoi"];
	$dongiadien = $obj["dongiadien"];
	$gianuoc = $obj["gianuoc"];
	$nguoinop = $obj["nguoithue"];
	$giaphong = $obj["giaphong"];


	//Lay iduser
	$sql1 = "SELECT id FROM user WHERE username ='$username'";
		$result1 = $db->query($sql1);
		if (mysqli_num_rows($result1) > 0) {
			while($row = $result1->fetch_assoc()) {
				$iduser = $row['id'];
			}
		}

		$tongtien = ($chisomoi - $chisocu)*$dongiadien + $gianuoc + $giaphong;

	$result = "UPDATE diennuoc SET tieude='$tieude', thangnam = '$thangnam', chisocu = '$chisocu', chisomoi = 	'$chisomoi', dongiadien = '$dongiadien', gianuoc = '$gianuoc', giaphong = '$giaphong', tongtien='$tongtien', nguoinop= '$nguoinop' WHERE iddn = '$iddn' AND iduser = '$iduser'";
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