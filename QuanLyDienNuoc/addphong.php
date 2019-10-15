	<?php
		include 'connect.php';
		$json = file_get_contents('php://input');
		$obj = json_decode($json,true);

		$username = $obj['username'];
		$tennguoithue = $obj['tennguoithue'];
		$giaphong = $obj['giaphong'];
		$tenphong = $obj['tenphong'];


		$sql1 = "SELECT id FROM user WHERE username ='$username'";
		$result1 = $db->query($sql1);
		if (mysqli_num_rows($result1) > 0) {
			while($row = $result1->fetch_assoc()) {
				$id = $row['id'];
			}
		}
		$Sql_Query = "INSERT INTO phong VALUES (null,'$id','$tennguoithue', '$tenphong', '$giaphong')";
		if(mysqli_query($db,$Sql_Query)){
			$MSG = 'Insert Done' ;
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