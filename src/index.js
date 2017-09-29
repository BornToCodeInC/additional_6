module.exports = function zeros(expression) {
  var arr =expression.split('');
	var starFlag=0;
	var expFlag=0;
	var num1="";
	var numres="";
	var numbuf="";
	
	function factorial(num1)
	{
		let prod = "1";

		for (let i = 1; i <= num1; i++)
		{
			prod = multiply(prod, i.toString());
		}

		return prod;
	}

	function evenFactorial(num1)
	{
		let prod = "1";

		for (let i = num1; i >= 1; i -= 2)
		{
			prod = multiply(prod, i.toString());
		}

		return prod;
	}

	function evenCheck(i) {
	    if (arr[i+1]==='!')
	    {
	        num1=evenFactorial(num1);
	        return true;
	    }
	    else
	    {
	        num1=factorial(num1);
	        return false;
	    }
	}

	function flush()
	{
	    num1 = parseInt(numbuf);
	    numbuf = "";
	}

	for (var i = 0; i < arr.length; i++)
	{
	    if(arr[i]==='!')
	    {
	        flush();

	        if(starFlag)
	        {
	            if (evenCheck(i)) expFlag++;

	            numres=multiply(numres, num1.toString());

	            starFlag--;
	        }

	        else if (expFlag)
	        	expFlag--;

	        else
	        {
	            if (evenCheck(i)) expFlag++;

	            numres=num1.toString();
	        }
	    }
	 
	    else if(arr[i]=='*')
	    {
	        starFlag++;
	    }

	    else
	    {
	        numbuf += arr[i];
	    }      
	}

	var zero_counter = 0;

	var numres_rev = numres.split('').reverse().join('');
	
	while (numres_rev.charAt(zero_counter) === "0")
	{
		zero_counter++;
	}

	return zero_counter;

  	function multiply(first, second)
	{
		var array_first = first.split('');
		var array_second = second.split('');

		var array_inter = [];
		var array_inter_counter = 0;

		var array_final = [];
		var array_final_counter = 0;

		for (let i = array_second.length - 1; i >= 0; i--)
		{
			array_inter[array_inter_counter] = [];

			let flag = 0;

			for (let j = array_first.length - 1; j >= 0; j--)
			{
				let inter_value = array_second[i] * array_first[j];

				inter_value += flag;

				if (inter_value.toString().length === 1)
				{
					if (flag > 0) flag = 0;

					array_inter[array_inter_counter].push(inter_value.toString());

					if (j === 0)
					{
						array_inter[array_inter_counter] = array_inter[array_inter_counter].reverse();
					}
				}

				else if (j !== 0)
				{
					flag = parseInt(inter_value.toString().charAt(0));

					array_inter[array_inter_counter].push(inter_value.toString().charAt(inter_value.toString().length - 1));
				}

				else
				{
					if (flag > 0) flag = 0;

					array_inter[array_inter_counter] = array_inter[array_inter_counter].concat(inter_value.toString().split('').reverse()).reverse();
				}
			}

			array_inter_counter++;
		}

		for (let i = 0; i < array_inter_counter; i++)
		{
			if (array_inter[i].length <= array_first.length)
				array_inter[i].unshift("0");
		}

		for (let i = 0, j = array_inter_counter - 1; i < array_inter_counter, j >= 0; i++, j--)
		{
			array_inter[i] = array_inter[i].concat("0".repeat(i).split(''));

			array_inter[i] = array_inter[i].reverse().concat("0".repeat(j).split('')).reverse();
		}

		array_final[array_final_counter] = [];

		for (let j = array_inter[0].length - 1; j >= 0; j--)
		{
			array_final[array_final_counter].push(array_inter[0][j]);
		}

		array_final[array_final_counter] = array_final[array_final_counter].reverse();

		array_final_counter++;

		for (let i = 0; i < array_inter_counter - 1; i++)
		{
			array_final[array_final_counter] = [];
			
			let flag = 0;

			for (let j = array_inter[i].length - 1; j >= 0; j--)
			{
				let inter_value = parseInt(array_final[i][j]) + parseInt(array_inter[i + 1][j]);

				inter_value += flag;

				//if (j === array_inter[i].length - 1 && inter_value === 0) continue;

				if (inter_value.toString().length === 1)
				{
					if (flag > 0) flag = 0;

					array_final[array_final_counter].push(inter_value.toString());
				}

				else if (j !== 0)
				{
					flag = parseInt(inter_value.toString().charAt(0));

					array_final[array_final_counter].push(inter_value.toString().charAt(inter_value.toString().length - 1));
				}

				else
				{
					if (flag > 0) flag = 0;

					array_final[array_final_counter] = array_final[array_final_counter].concat(inter_value.toString().split(''));
				}
			}

			array_final[array_final_counter] = array_final[array_final_counter].reverse();

			array_final_counter++;
		}

		var result = array_final[array_final_counter - 1].join('').toString();

		while (result.charAt(0) === "0")
			result = result.substring(1);

		return result;
	}
}
