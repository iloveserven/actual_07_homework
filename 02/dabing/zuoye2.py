#encoding:utf-8

def  inser_sort():
	arr = [1,2,3,4,2,12,3,14,3,2,12,3,14,3,21,2,2,3,4111,22,3333,4]
	for i in range(len(arr)):   ##閬嶅巻list
		min_in = i             ##瀹氫箟list涓渶灏忕殑鏁板搴旂殑绱㈠紩
		for j in range(i+1,len(arr)):   ##浠庣i+1涓暟寮€濮嬮亶鍘嗙储寮?
			if arr[min_in] >  arr[j]:   ##濡傛灉鏈€灏忕储寮曞搴旂殑鏁版瘮鍚庨潰鐨勬暟澶э紝閭ｄ箞灏辨妸绱㈠紩鍊艰祴缁欐渶灏忓€肩殑绱㈠紩
				min_in = j
		arr[min_in],arr[i] = arr[i],arr[min_in]               ##绱㈠紩瀵瑰簲鐨勫€间簰鎹綅缃?
	print arr 

inser_sort()
