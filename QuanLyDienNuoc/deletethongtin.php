<?php
	include 'connect.php';
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

 	$iddn = $obj['iddn'];
 
 
 $qr = "SELECT * FROM diennuoc WHERE iddn = '$iddn'";
	$result = $db->query($qr);

	if (mysqli_num_rows($result) > 0) {
		 $Sql_Query = "DELETE FROM diennuoc WHERE iddn = '$iddn'" ;
		if(mysqli_query($db,$Sql_Query)){
			$MSG = 'Delete Done' ;
			$json = json_encode($MSG);
			echo $json ;	 
 		}

	 	else{
			 $MSGEr = 'Try Again';
			 $jsonEr = json_encode($MSGEr);
			 echo $jsonEr ;
		 
	 	}
	}
	else{
		$MSGEr2 = 'Không tồn tại bản ghi';
		$jsonEr2 = json_encode($MSGEr2);
		echo $jsonEr2 ;
	}


 mysqli_close($db);
?>